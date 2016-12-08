import {Router, Request, Response, RequestHandler} from 'express';
import {readFileSync} from 'fs';
import { join } from 'path';
import 'svelte/ssr/register';

const router: Router = Router();

const routes: {[key: string]: string[]} = {
    'home': ['/', '/home'],
    'error': []
};
const componentList: string[] = require(join(process.cwd(), '..', 'client', 'src', 'components', 'index.json'));

const _devathonObject: {[key: string]: any} = {};
componentList.forEach(component => {
    // _devathonObject[component] = require(join(process.cwd(), '..', 'client', 'src', 'components', `${component}.html`));
});
(global as any)._devathon = _devathonObject;

const components: {[key: string]: string[]} = {};

const compiled: {[key: string]: any} = {};

for (let property in routes) {
    if (routes.hasOwnProperty(property)) {
        const baseDir = join(process.cwd(), '..', 'client', 'src', 'routes', property);
        components[property] = require(join(baseDir, `components.json`));
        // compiled[property] = require(join(baseDir, `${property}.html`));
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

export function renderRoute(name: string, state: any = {}, res: Response) {
    let template: string = getTemplate();
    template = template.replace('CSSSTUFF', `
`);
    template = template.replace('JSSTUFF', `
<script>
window._devathon = {
    state: ${JSON.stringify(state)}
};
</script>
${components[name].map(component => `<script src="/public/js/component/${component}.js"></script>`).join('\n')}
<script src="/public/js/route/${name}.js"></script>
`);
    res.end(template);
}

function registerRoute(name: string, routes: string[]) {
    const handler = (req: Request, res: Response) => {
        renderRoute(name, {}, res);
    };
    routes.forEach(route => router.get(route, handler));
}

export default router;
