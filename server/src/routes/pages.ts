import {Router, Request, Response, RequestHandler} from 'express';
import {readFileSync} from 'fs';
import { join } from 'path';

const router: Router = Router();

const routes: {[key: string]: string[]} = {
    'home': ['/', '/home'],
    'error': []
};

for (let property in routes) {
    if (routes.hasOwnProperty(property)) {
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
<script src="/public/js/vendor.bundle.js"></script>
<script src="/public/js/${name}.bundle.js"></script>
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
