import {install} from 'source-map-support';
import * as express from 'express';
import {Express} from 'express';
import * as serveStatic from 'serve-static';
import * as bodyParser from 'body-parser';

import pages from './src/routes/pages';
import authentication from './src/routes/authentication';

import config from './config/config';

install();

const app: Express = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/public/js', serveStatic('../client/build'));
app.use('/public/css', serveStatic('../client/styles'));

app.use(pages);
app.use('/authentication', authentication);

app.listen(config.port, config.host, () => console.log(`Listening on ${config.host}:${config.port}`));
