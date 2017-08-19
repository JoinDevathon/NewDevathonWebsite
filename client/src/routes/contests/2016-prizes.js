import { devathon } from '../common';
import Prizes from './2016-prizes.html';

if (devathon().page === 'twenty_prizes') {
    new Prizes({
        target: document.getElementById('container')
    });
}

