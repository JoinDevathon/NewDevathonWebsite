import { Router, Request, Response } from 'express';
import { wrap, RouteError } from './utils';
import { IsString, Rules, validate, Or, And, IsNull, Between, Matches, StartsWith, NotIn, ValidatorError } from './validator';
import { updateMedia } from '../data/users';
import { set2016Prize } from '../data/contests';
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

    // give them that sexy loading indicator
    setTimeout(() => {
        res.json({
            error: false
        });
    }, 800);
}));

const TwentyShirtRules: Rules = {
    size: And(IsString, ({ value }) => {
        console.log('value:', value, ['s', 'm', 'l', 'xl'].indexOf(value));
        if ([ 's', 'm', 'l', 'xl' ].indexOf(value) < 0) {
            throw new ValidatorError('Invalid shirt size');
        }
    })
};

router.post('/2016/prizes', wrap(async(req: Request, res: Response) => {
    if (!req.session.userId) {
        throw new RouteError('You are not logged in!');
    }
    await validate(req.body, TwentyShirtRules);
    await set2016Prize(req.session.userId, req.body.size);

    res.redirect('/2016/prizes');
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
    image: And(IsString, Or(StartsWith('data:image/jpeg;base64,', 'Invalid image'), StartsWith('data:image/png;base64,', 'Invalid image')))
};
/*router.post('/profile/teams/create', wrap(async(req: Request, res: Response) => {
    if (!req.session.userId) {
        throw new RouteError('You are not logged in!');
    }
    await validate(req.body, CreateTeamRules);

    const buffer: Buffer = Buffer.from(req.body.image.substr(22), 'base64');

    const resized: Buffer = await new Promise<Buffer>((resolve, reject) => gm(buffer)
        .resize(300, 300, '!')
        .noProfile()
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
}));*/

export default router;
