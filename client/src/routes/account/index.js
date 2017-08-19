import { devathon } from '../common';
import Account from './account.html';

if (devathon().page === 'account') {
    new Account({
        target: document.getElementById('container'),
        hydrate: true
    });
}
