import {install} from 'source-map-support';
import * as express from 'express';
import {Express} from 'express';
import * as serveStatic from 'serve-static';

import pages from './src/routes/pages';

import config from './config/config';

install();

const app: Express = express();

app.use('/public/js', serveStatic('../client/build'));
app.use('/public/css', serveStatic('../client/styles'));

app.use(pages);

app.listen(config.port, config.host, () => console.log(`Listening on ${config.host}:${config.port}`));
