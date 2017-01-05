import home from './home/index';
import account from './account/index';
import teamCreate from './teams/create';
import teams from './teams/index';
import error from './error/index';
import {devathon} from './common';

(() => {
    switch (devathon().page) {
        case 'home':
            return home();
        case 'account':
            return account();
        case 'teams':
            return teams();
        case 'teamCreate':
            return teamCreate();
        case 'error':
            return error();
        default:
            console.error('No such page', devathon().page);
    }
})();
