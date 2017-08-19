import { devathon } from '../common';
import Entry from './entry.html';

if (devathon().page === 'entry') {
    new Entry({
        target: document.getElementById('container'),
        hydrate: true
    });
}

