import { devathon } from '../common';
import Teams from './teams.html';

if (devathon().page === 'teams') {
    new Teams({
        target: document.getElementById('container'),
        hydrate: true
    });
}
