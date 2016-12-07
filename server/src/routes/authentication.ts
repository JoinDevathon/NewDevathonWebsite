import {Router, Request, Response} from 'express';
import {wrap, RouteError} from './utils';

import config from '../../config/config';

const router: Router = Router();

router.get('/away', (req: Request, res: Response) => {
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${config.github.clientId}&scope=user:email`);
});

router.get('/back', wrap((req: Request, res: Response) => {
    if (!req.query.code) {
        throw new RouteError('You do not have a code!');
    }
}));

export default router;
