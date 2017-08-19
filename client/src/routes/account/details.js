import { devathon } from '../common';
import Details from './details.html';

if (devathon().page === 'accountDetails') {
    new Details({
        target: document.getElementById('container'),
        hydrate: true
    });
}
