import home from './home/index';
import error from './error/index';
import {devathon} from './common';

(() => {
    switch (devathon().page) {
        case 'home':
            return home();
        case 'error':
            return error();
        default:
            console.error('No such page', devathon().page);
    }
})();
