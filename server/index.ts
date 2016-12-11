import {install} from 'source-map-support';
import * as express from 'express';
import {Express} from 'express';
import * as serveStatic from 'serve-static';
import * as bodyParser from 'body-parser';
import * as session from 'express-session';
import * as createSmartRedis from 'connect-smart-redis';

import pages from './src/routes/pages';
import authentication from './src/routes/authentication';

import config from './config/config';
import { doMigrations } from './src/data/migration';
import { client } from './src/cache/connect';
import { renderRoute } from './src/routes/pages';

install();

const app: Express = express();

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

app.use(pages);
app.use('/authentication', authentication);

app.use((req, res) => { // 404
    res.status(404);
    if (req.header('accept').indexOf('text/html') > -1) { // browser who wants HTML
        renderRoute('error', {
            error: true,
            message: 'Page not found.'
        }, res);
    } else {
        res.json({
            error: true,
            message: 'Page not found.'
        });
    }
});

doMigrations();

app.listen(config.port, config.host, () => console.log(`Listening on ${config.host}:${config.port}`));
