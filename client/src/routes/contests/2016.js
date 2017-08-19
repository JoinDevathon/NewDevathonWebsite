import { devathon } from '../common';
import TwentySixteen from './2016.html';

if (devathon().page === 'twentysixteen') {
    new TwentySixteen({
        target: document.getElementById('container'),
        hydrate: true
    });
}
