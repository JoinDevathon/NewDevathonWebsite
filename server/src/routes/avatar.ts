import {Router, Request, Response} from 'express';
import {wrap, RouteError} from './utils';
import fetch from 'node-fetch';

const router: Router = Router();

router.get('/:id.png', wrap((req: Request, res: Response) => {
    const id: number = +req.params.id;
    const size: number = +req.query.size | 0;
    if (size >= 0b11111111) {
        throw new RouteError('Invalid size.');
    }
    const hash: string = `W/"${((id << 8) | size).toString(16)}"`;
    if (req.header('If-None-Match') === hash) {
        return res.status(304).end();
    }

    let url: string = `https://avatars.githubusercontent.com/u/${id}`;
    if (req.query.size) {
        url += `?size=${size}`;
    }
    fetch(url).then((http: any) => {
        const fileSize: number = +http.headers.get('Content-Length');
        res.setHeader('Cache-Control', 'public, max-age=' + (60 * 60 * 24 * 7));
        res.setHeader('ETag', hash);
        res.setHeader('Content-Type', 'image/png');
        res.setHeader('Content-Length', http.headers.get('Content-Length'));
        return http.body.pipe(res);
    });
}));

export default router;
