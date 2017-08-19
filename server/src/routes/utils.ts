import { Request, Response } from 'express';
import { renderRoute } from './pages';

const debug = require('debug')('Devathon:Utils');
type func = (req: Request, res: Response, err?: Error) => Promise<any> | void;

export class RouteError {
    constructor(public message: string) {
    }
}

export function checkObject(obj: {error?: string}) {
    if (obj.error) {
        debug(obj);
        throw new RouteError('An error occurred.');
    }
}

export function wrap(func: func) {
    return (req: Request, res: Response) => {
        function handleError(error: RouteError | Error) {
            let status: number;
            let message: string;

            if (error instanceof RouteError) {
                status = 400;
                message = error.message;
            } else {
                debug(error);
                status = 500;
                message = 'An internal error occurred.'
            }
            if (req.header('accept').indexOf('text/html') > -1) { // browser who wants HTML
                res.status(status);
                renderRoute('error', {
                    error: true,
                    message
                }, res);
            } else {
                res.status(status).json({
                    error: true,
                    message
                });
            }
        }

        try {
            const possible: Promise<any> | void = func(req, res);
            if (possible && possible.then) {
                const promise: Promise<any> = possible;
                promise.catch((err: Error) => handleError(err));
            }
        } catch (err) {
            try {
                handleError(err);
            } catch (newError) {
                debug('Failed to handle error', err, newError);
            }
        }
    };
}