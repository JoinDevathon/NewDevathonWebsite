import { devathon } from '../common';
import ErrorRoute from './errorRoute.html';

if (devathon().page === 'error') {
    new ErrorRoute({
        target: document.getElementById('container')
    });
}

