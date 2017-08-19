import { Router, Request, Response } from 'express';
import { readFileSync } from 'fs';
import { join } from 'path';
import { wrap, RouteError } from './utils';
import { getUserById, UserAttributes, getTrophies, getBasicUserById, getShippingInfo } from '../data/users';
import { getUserName } from '../cache/user';
import { getAllContests, getContestFromURL, getEntryAndScores, getFeedback, getContestFromEntry, getUserFromEntry, ScoredEntry, get2016Prize } from '../data/contests';
import { hash, unhash } from '../utils/ids';
import * as CleanCSS from 'clean-css';
import { getContestScores } from '../cache/contest';
import { getTeamsForUser, UserWithRole, getTeamMembers, getTeam } from '../data/teams';

const debug = require('debug')('Devathon:Pages');
const router: Router = Router();

const routes: {[key: string]: string[]} = {
    'home': [ '/', '/home' ],
    'account': [ '/user/:id' ],
    'accountDetails': [ '/account/details' ],
    //    'teamCreate': [ '/teams/create' ],
    //'teams': [ '/teams/:url' ],
    //'teamInvite': [ '/teams/:url/invite' ],
    'twentysixteen': [ '/2016/' ],
    '2016_prizes': [ '/2016/prizes'],
    'winners': ['/2016/winners'],
    'entry': [ '/entry/:id' ],
    'error': []
};

let svelteComponents: any;
let svelteCss: {[key: string]: string} = {};
let compiledCss: string = '';

function addCSS(obj: any) {
    if (obj.filename) {
        svelteCss[obj.filename] = obj.css;
    }
    if (obj.components) {
        obj.components.forEach(addCSS);
    }
}

if (process.env.NODE_ENV === 'production') {
    svelteComponents = require(join(process.cwd(), '..', 'client', 'build', 'server.bundle.js'));
    Object.keys(svelteComponents).forEach((key: string) => {
        const route = svelteComponents[key];
        debug('Route', route, 'has methods', Object.keys(route));
        let rendered = route.renderCss();
        svelteCss[key] = new CleanCSS().minify(rendered.css).styles;
    });
}

for (let property in routes) {
    if (routes.hasOwnProperty(property)) {
        registerRoute(property, routes[ property ]);
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

export function renderRoute(name: string, state: any = {}, res: Response, justData?: boolean) {
    let template: string = getTemplate();
    state = Object.assign({}, state, {
        page: name
    });

    if (justData) {
        return res.json(state);
    }

    const bundles: string[] = [];

    let prerendered: string = '<div id="container"></div>';
    if (svelteComponents && svelteComponents[ name ] && process.env.NODE_ENV === 'production') {
        template = template.replace('CSSSTUFF', `<style>${svelteCss[name]}</style>`);

        (global as any)._devathon = {
            state
        };

        prerendered = `<div id="container">${svelteComponents[name].render()}</div>`;

        bundles.push('/public/js/manifest.bundle.js');
        bundles.push('/public/js/vendor.bundle.js');
        bundles.push(`/public/js/${name}.bundle.js`);

        next();
    } else {
        template = template.replace('CSSSTUFF', '');
        bundles.push('/public/js/main.bundle.js');
        next();
    }

    function next() {
        template = template.replace('CONTENT', prerendered);

        template = template.replace('JSSTUFF', `

<script>
window._devathon = {
    state: ${JSON.stringify(state)}
};
</script>
`);

        template = template.replace('JSBUNDLES', JSON.stringify(bundles));
        res.end(template);
    }
}

function registerRoute(name: string, routes: string[]) {
    const handler = async(req: Request, res: Response) => {
        const time = Date.now();
        let state: any = {
            account: {}
        };
        let justData = req.header('X-Devathon-Data') === 'include';
        switch (name) {
            case '2016_prizes':
                if (req.session && req.session.userId) {
                    state.account = await getBasicUserById(req.session.userId);
                    state.account.id = hash(state.account.id);
                    state.size = await get2016Prize(req.session.userId);
                }
                break;
            case 'teams':
                state.team = await getTeam(req.params.url); // falling falling falling
                state.team.members = await getTeamMembers(state.team.id);
                state.team.members = await Promise.all(state.team.members.map(async(member: UserWithRole) => {
                    return Object.assign({
                        username: await getUserName(member.github_id)
                    }, member, {
                        id: hash(member.id)
                    });
                }));
                if (req.session && req.session.userId) {
                    state.account = await getBasicUserById(req.session.userId);
                    state.account.id = hash(state.account.id);
                }
                break;
            case 'home':
                state.contests = await getAllContests();
                if (req.session && req.session.userId) {
                    state.account = await getBasicUserById(req.session.userId);
                    state.account.id = hash(state.account.id);
                }
                break;
            case 'teamCreate':
                if (req.session && req.session.userId) {
                    state.account = await getBasicUserById(req.session.userId);
                    state.account.id = hash(state.account.id);
                }
                break;
            case 'teamInvite':
                if (req.session && req.session.userId) {
                    state.account = await getBasicUserById(req.session.userId);
                } else {
                    res.status(500);
                    renderRoute('error', {
                        message: 'You are not logged in!'
                    }, res, justData);
                    return;
                }
                const teams = await getTeamsForUser(req.session.userId);
                const potential = teams.filter(team => team.url === req.params.url && team.role === 'owner');
                if (potential.length === 0) {
                    res.status(500);
                    renderRoute('error', {
                        message: 'You are not the owner of this team!'
                    }, res, justData);
                    return;
                }
                const team = potential[0];
                const members = await getTeamMembers(team.id);
                console.log(members, team.id);
                state.team = Object.assign(team, { members: members.map(member => {
                    (<any>member).id = hash(member.id);
                    return member;
                }) });
                state.account.id = hash(state.account.id);
                break;
            case 'account':
                if (!(req.params && req.params.id)) {
                    res.status(400);
                    renderRoute('error', {
                        message: 'An error occurred processing the user id.'
                    }, res, justData);
                    return;
                }

                const user: UserAttributes | undefined = await getUserById(unhash(req.params.id));
                if (user) {
                    state.user = user;
                } else {
                    res.status(400);
                    renderRoute('error', {
                        message: 'User not found.'
                    }, res, justData);
                    return;
                }
                state.user.username = await getUserName(state.user.github_id);
                if (req.session.userId) {
                    if (req.session.userId === state.user.id) {
                        state.account = {
                            id: req.params.id,
                            github_id: state.user.github_id
                        };
                    } else {
                        state.account = await getBasicUserById(req.session.userId);
                        state.account.id = hash(state.account.id);
                    }
                }
                state.user.trophies = await getTrophies(state.user.id);
                state.user.contests = await getEntryAndScores(state.user.id);
                state.user.contests = state.user.contests.map((contest: ScoredEntry) => {
                    (<any>contest).entry_id = hash(contest.entry_id);
                    return contest;
                });

                if (state.user.contests.length > 0 && await getShippingInfo(state.user.id, true) === null) {
                    state.user.needsShippingInfo = true;
                }
                if (state.user.contests.length > 0 && await get2016Prize(state.user.id) === '') {
                    state.user.needs2016Prize = true;
                }

                state.user.teams = await getTeamsForUser(state.user.id);
                (<any>state.user).id = hash(state.user.id);
                break;
            case 'accountDetails':
                if (!req.session || !req.session.userId || typeof req.session.userId !== 'number') {
                    res.status(400);
                    return renderRoute('error', {
                        message: 'You are not logged in.',
                    }, res, justData);
                }
                state.account = await getBasicUserById(req.session.userId);
                state.account.id = hash(state.account.id);
                state.details = { username: null };
                state.shipping = await getShippingInfo(req.session.userId);
                break;
            case 'twentysixteen':
                if (req.session && req.session.userId) {
                    state.account = await getBasicUserById(req.session.userId);
                    state.account.id = hash(state.account.id);
                }
                state.contest = await getContestFromURL('2016');
                break;
            case 'winners':
                if (req.session && req.session.userId) {
                    state.account = await getBasicUserById(req.session.userId);
                    state.account.id = hash(state.account.id);
                }
                state.contest = await getContestFromURL(req.url.split('/')[1]);
                state.scores = await getContestScores(state.contest.id);
                break;
            case 'entry':
                const id = unhash(req.params.id);
                state.feedback = (await getFeedback(id)).map(feedback => {
                    feedback.reviewer = hash(<number>feedback.reviewer);
                    return feedback;
                });
                if (state.feedback.length === 0) {
                    throw new RouteError('No such entry.');
                }
                state.contest = await getContestFromEntry(id);
                const theUser: UserAttributes = await getUserFromEntry(id);
                state.username = await getUserName(theUser.github_id);
                state.id = hash(theUser.id);
                if (req.session && req.session.userId) {
                    if (req.session.userId === theUser.id) {
                        state.account = {
                            id: hash(theUser.id),
                            github_id: theUser.github_id
                        };
                    } else {
                        state.account = await getBasicUserById(req.session.userId);
                        state.account.id = hash(state.account.id);
                    }
                }
        }
        renderRoute(name, state, res, justData);
        debug('Took', Date.now() - time, 'ms to render page', name);
    };
    routes.forEach(route => router.get(route, wrap(handler)));
}

export default router;
