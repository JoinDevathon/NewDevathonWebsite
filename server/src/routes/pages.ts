import {Router, Request, Response, RequestHandler} from 'express';
import {readFileSync} from 'fs';
import { join } from 'path';
import 'svelte-ssr/register';

const router: Router = Router();

const routes: {[key: string]: string[]} = {
    'home': ['/', '/home']
};

const compiled: {[key: string]: any} = {};

for (let property in routes) {
    if (routes.hasOwnProperty(property)) {
        compiled[property] = require(join(process.cwd(), '../', 'client', 'routes', property, `${property}.html`));
        registerRoute(property, routes[property]);
    }
}

let template: string;

function getTemplate(): string {
    const path = join(process.cwd(), 'index.html');
    if (!template || !process.env.PRODUCTION) {
        return template = readFileSync(path, 'utf8');
    }
    return template;
}

function registerRoute(name: string, routes: string[]) {
    const handler = (req: Request, res: Response) => {
        let template: string = getTemplate();
        template = template.replace('CSSSTUFF', `
`);
        template = template.replace('JSSTUFF', `
<script src="/public/js/${name}.js"></script>
`);
        res.end(template);
    };
    routes.forEach(route => router.get(route, handler));
}

export default router;
