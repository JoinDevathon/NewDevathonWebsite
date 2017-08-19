import { devathon } from '../common';
import Prizes from './2016-prizes.html';

if (devathon().page === 'twentyprizes') {
    new Prizes({
        target: document.getElementById('container'),
        hydrate: true
    });
}

