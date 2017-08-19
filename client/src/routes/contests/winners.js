import { devathon } from '../common';
import Winners from './winners.html';

if (devathon().page === 'winners') {
    new Winners({
        target: document.getElementById('container'),
        hydrate: true
    });
}
