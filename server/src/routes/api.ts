import { Router, Request, Response } from 'express';
import { wrap, RouteError } from './utils';
import { IsString, Rules, validate, Or, IsUndefined, And, IsNull, Between, Matches, StartsWith, NotIn } from './validator';
import { updateMedia } from '../data/users';
import * as gm from 'gm';
import { createTeam, setTeamRole } from '../data/teams';

const debug = require('debug')('Devathon:API');
const router: Router = Router();

const EditMediaRules: Rules = {
    beam: Or(IsNull, And(IsString, Between(0, 22))),
    twitch: Or(IsNull, And(IsString, Between(0, 22))),
    twitter: Or(IsNull, And(IsString, Between(0, 22))),
};
router.post('/profile/media/edit', wrap(async(req: Request, res: Response) => {
    if (!req.session.userId) {
        throw new RouteError('You are not logged in!');
    }
    await validate(req.body, EditMediaRules);
    await updateMedia(req.session.userId, req.body.beam, req.body.twitch, req.body.twitter);

    res.json({
        error: false
    });
}));

const CreateTeamRules: Rules = {
    name: And(IsString, Between(4, 18)),
    url: And(IsString, And(Between(4, 18), And(Matches(/[a-zA-Z0-9-_]/g, 'url is not in correct format'), NotIn([
        'create',
        'edit',
        'delete',
        'members',
        'settings'
    ], 'Team URL is reserved')))),
    description: And(IsString, Between(0, 200)),
    image: And(IsString, StartsWith('data:image/png;base64,', 'Invalid image'))
};
router.post('/profile/teams/create', wrap(async(req: Request, res: Response) => {
    if (!req.session.userId) {
        throw new RouteError('You are not logged in!');
    }
    await validate(req.body, CreateTeamRules);

    const buffer: Buffer = Buffer.from(req.body.image.substr(22), 'base64');

    const resized: Buffer = await new Promise<Buffer>((resolve, reject) => gm(buffer)
    .resize(150, 150)
    .toBuffer('PNG', (err: Error, buffer: Buffer) => {
        if (err) {
            return reject(err);
        }
        resolve(buffer);
    }));

    try {
        const id: number = await createTeam(req.body.name, req.body.url, req.body.description, resized);
        await setTeamRole(req.session.userId, id, 'owner');
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            throw new RouteError('URL is taken.');
        }
        throw err;
    }

    res.json({
        url: req.body.url
    });
}));

export default router;
