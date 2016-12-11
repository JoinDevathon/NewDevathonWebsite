import {Router, Request, Response} from 'express';
import { wrap, RouteError, checkObject } from './utils';
import {stringify} from 'querystring';
import fetch from 'node-fetch';

import config from '../../config/config';
import { query } from '../data/connect';
import { getToken, getUserFromAccess, GithubAccessToken, GithubUser } from '../connect/github';
import { createUser } from '../data/users';

const debug = require('debug')('Devathon:Authentication');
const router: Router = Router();

router.get('/away', (req: Request, res: Response) => {
    if (req.session.userId) {
        res.redirect(`/user/${req.session.userId}`);
    } else {
        res.redirect(`https://github.com/login/oauth/authorize?client_id=${config.github.clientId}&scope=user:email`);
    }
});

router.get('/back', wrap(async (req: Request, res: Response) => {
    if (!req.query.code) {
        throw new RouteError('You do not have a code!');
    }

    const tokens: GithubAccessToken = await getToken(req.query.code);
    checkObject(tokens);

    const user: GithubUser = await getUserFromAccess(tokens.access_token);
    checkObject(user);

    if (!user.login) {
        debug(user.login);
        throw new RouteError('Failed to authenticate with GitHub.');
    }

    const userId: number = await createUser(user.id, user.email || null);
    req.session.userId = userId;

    res.redirect(`/user/${userId}`);
}));

router.get('/logout', (req: Request, res: Response) => {
    req.session.destroy((err: Error) => err && console.error(err));
    res.redirect('/');
});

export default router;
