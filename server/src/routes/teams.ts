import {Router, Request, Response} from 'express';
import {wrap, RouteError} from './utils';
import { getTeamImage } from '../data/teams';

const router: Router = Router();

router.get('/:url.png', wrap(async (req: Request, res: Response) => {
    const hash: string = 'W/"' + Buffer.from(req.params.url, 'utf8').toString('hex') + '"';
    if (req.header('If-None-Match') === hash) {
        return res.status(304).end();
    }

    const buffer: Buffer = await getTeamImage(req.params.url);
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Content-Length', String(buffer.length));
    res.setHeader('Cache-Control', 'public, max-age=' + (60 * 60 * 24 * 7));
    res.setHeader('ETag', hash);
    res.send(buffer);
}));

export default router;
