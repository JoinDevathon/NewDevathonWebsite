import {install} from 'source-map-support';
import * as express from 'express';
import {Express, Request, Response, NextFunction} from 'express';
import * as serveStatic from 'serve-static';
import * as bodyParser from 'body-parser';
import * as session from 'express-session';
import * as createSmartRedis from 'connect-smart-redis';

import pages from './src/routes/pages';
import authentication from './src/routes/authentication';
import avatar from './src/routes/avatar';
import api from './src/routes/api';
import teams from './src/routes/teams';

import config from './config/config';
import { doMigrations } from './src/data/migration';
import { client } from './src/cache/connect';
import { renderRoute } from './src/routes/pages';

install();

const debug = require('debug')('Devathon:Main');
const app: Express = express();

if (process.env.NODE_ENV === 'development') {
    app.use(function (req: Request, res: Response, next: NextFunction) {
        debug(req.method, req.url);
        next();
    });
}

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const SmartRedis = createSmartRedis(session);

app.use(session({
    store: new SmartRedis({
        client: client,
        ttl: 7 * 24 * 60 * 60, // 7 days
        prefix: 'dn:sess:',
        lockExpiry: 1500,
        deleteExpiry: 2000
    }),
    name: 'devathon.sid',
    secret: config.sessions.secret,
    resave: false,
    saveUninitialized: false
}));

app.use('/public/js', serveStatic('../client/build'));
app.use('/public/css', serveStatic('../client/styles'));
app.use('/public/images', serveStatic('../client/images'));

app.use('/teams', teams);
app.use(pages);
app.use('/avatar', avatar);
app.use('/authentication', authentication);
app.use('/api', api);

app.use((err: Error, req: Request, res: Response, next: () => void) => { // 404
    let data = {
        error: true,
        message: 'Page not found.'
    };
    let status = 404;
    if (err) {
        data = {
            error: true,
            message: 'A server error occurred.'
        };
        console.error(err);
        status = 500;
    }
    res.status(status);
    if (req.header('accept') && req.header('accept').indexOf('text/html') > -1) { // browser who wants HTML
        renderRoute('error', data, res);
    } else {
        res.json(data);
    }
});

app.listen(config.port, config.host, () => console.log(`Listening on ${config.host}:${config.port}`));
