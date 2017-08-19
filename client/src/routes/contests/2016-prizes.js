import { devathon } from '../common';
import Prizes from './2016-prizes.html';

if (devathon().page === '2016_prizes') {
    new Prizes({
        target: document.getElementById('container')
    });
}

