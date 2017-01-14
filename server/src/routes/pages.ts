import { Router, Request, Response } from 'express';
import { readFileSync } from 'fs';
import { join } from 'path';
import { wrap } from './utils';
import { getUserById, UserAttributes, getTrophies, getBasicUserById } from '../data/users';
import { getUserName } from '../cache/user';
import { getAllContests, getContestFromURL, getEntryAndScores, getFeedback, getContestFromEntry, getUserFromEntry, ScoredEntry } from '../data/contests';
import { hash, unhash } from '../utils/ids';

const debug = require('debug')('Devathon:Pages');
const router: Router = Router();

const routes: {[key: string]: string[]} = {
    'home': [ '/', '/home' ],
    'account': [ '/user/:id' ],
    // 'teamCreate': [ '/teams/create' ],
    // 'teams': [ '/teams/:url' ],
    '2016': [ '/2016' ],
    'entry': [ '/entry/:id' ],
    'error': []
};

let svelteComponents: any;

if (process.env.NODE_ENV === 'production') {
    svelteComponents = require(join(process.cwd(), '..', 'client', 'build', 'bundle.server.js'));
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

export function renderRoute(name: string, state: any = {}, res: Response) {
    let template: string = getTemplate();
    state = Object.assign({}, state, {
        page: name
    });

    let prerendered: string = '<div id="container"></div>';
    if (svelteComponents && svelteComponents[ name ] && process.env.NODE_ENV === 'production') {
        template = template.replace('CSSSTUFF', `<style>${svelteComponents[name].renderCss().css}</style>`);

        (global as any)._devathon = {
            state
        };

        prerendered = `<div id="container">${svelteComponents[name].render()}</div>`;
        next();
    } else {
        template = template.replace('CSSSTUFF', '');
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
<script src="/public/js/bundle.js" async></script>
`);
        res.end(template);
    }
}

function registerRoute(name: string, routes: string[]) {
    const handler = async(req: Request, res: Response) => {
        const time = Date.now();
        let state: any = {
            account: {}
        };
        switch (name) {
            // case 'teams':
            //     state.team = await getTeam(req.params.url); // falling falling falling
            //     state.team.members = await getTeamMembers(state.team.id);
            //     state.team.members = await Promise.all(state.team.members.map(async(member: UserWithRole) => {
            //         return Object.assign({
            //             username: await getUserName(member.github_id)
            //         }, member);
            //     }));
            case 'home':
                state.contests = await getAllContests();
                // case 'teamCreate':
                if (req.session && req.session.userId) {
                    state.account = await getBasicUserById(req.session.userId);
                    state.account.id = hash(state.account.id);
                }
                break;
            case 'account':
                if (!(req.params && req.params.id)) {
                    res.status(400);
                    renderRoute('error', {
                        message: 'An error occurred processing the user id.'
                    }, res);
                    return;
                }

                const user: UserAttributes | undefined = await getUserById(unhash(req.params.id));
                if (user) {
                    state.user = user;
                } else {
                    res.status(400);
                    renderRoute('error', {
                        message: 'User not found.'
                    }, res);
                    return;
                }
                state.user.username = await getUserName(state.user.github_id);
                if (req.session.userId) {
                    if (req.session.userId === state.user.id) {
                        state.account = {
                            id: hash(state.user.id),
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
                // state.user.teams = await getTeamsForUser(state.user.id);
                (<any>state.user).id = hash(state.user.id);
                break;
            case '2016':
                if (req.session && req.session.userId) {
                    state.account = await getBasicUserById(req.session.userId);
                    state.account.id = hash(state.account.id);
                    state.contest = await getContestFromURL('2016');
                }
                break;
            case 'entry':
                const id = unhash(req.params.id);
                state.feedback = await getFeedback(id);
                state.contest = await getContestFromEntry(id);
                const theUser: UserAttributes = await getUserFromEntry(id);
                state.username = await getUserName(theUser.github_id);
                state.id = hash(theUser.id);
                if (req.session && req.session.userId) {
                    if (req.session.userId === theUser.id) {
                        state.account = {
                            id: hash(theUser.id),
                            github_id: theUser.github_id
                        }
                    } else {
                        state.account = await getBasicUserById(req.session.userId);
                        state.account.id = hash(state.account.id);
                    }
                }
        }
        renderRoute(name, state, res);
        debug('Took', Date.now() - time, 'ms to render page', name);
    };
    routes.forEach(route => router.get(route, wrap(handler)));
}

export default router;
