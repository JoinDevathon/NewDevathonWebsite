import { devathon } from '../common';
import Home from './home.html';

if (devathon().page === 'home') {
    new Home({
        target: document.getElementById('container'),
        hydrate: true
    });
}

