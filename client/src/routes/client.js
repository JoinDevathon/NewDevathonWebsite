import home from './home/index';
import account from './account/index';
// import teamCreate from './teams/create';
// import teams from './teams/index';
import TwentySixteen from './contests/2016';
import Entry from './contests/entry';
import Winners from './contests/winners';
import error from './error/index';
import {devathon} from './common';

(() => {
    switch (devathon().page) {
        case 'home':
            return home();
        case 'account':
            return account();
        // case 'teams':
        //     return teams();
        // case 'teamCreate':
        //     return teamCreate();
        case 'twentysixteen':
            return TwentySixteen();
        case 'winners':
            return Winners();
        case 'entry':
            return Entry();
        case 'error':
            return error();
        default:
            console.error('No such page', devathon().page);
    }
})();
