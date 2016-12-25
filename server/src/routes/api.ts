import { Router, Request, Response } from 'express';
import { wrap, RouteError } from './utils';
import { IsString, Rules, validate, Or, IsUndefined, And, IsNull } from './validator';
import { updateMedia } from '../data/users';

const debug = require('debug')('Devathon:API');
const router: Router = Router();

const EditMediaRules: Rules = {
    beam: Or(IsNull, And(IsString, value => value.length < 22)),
    twitch: Or(IsNull, And(IsString, value => value.length < 22)),
    twitter: Or(IsNull, And(IsString, value => value.length < 22)),
};
router.post('/profile/media/edit', wrap(async (req: Request, res: Response) => {
    if (!req.session.userId) {
        throw new RouteError('You are not logged in!');
    }
    await validate(req.body, EditMediaRules);
    await updateMedia(req.session.userId, req.body.beam, req.body.twitch, req.body.twitter);

    res.json({
        error: false
    });
}));

export default router;
