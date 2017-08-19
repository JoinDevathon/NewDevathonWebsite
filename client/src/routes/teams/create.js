import {devathon} from '../common';
import Create from './create.html';

if (devathon().page === 'teamCreate') {
    new Create({
        target: document.getElementById('container'),
        hydrate: true
    });
}
