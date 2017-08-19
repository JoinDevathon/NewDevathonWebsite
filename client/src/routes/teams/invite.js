import { devathon } from '../common';
import Invite from './invite.html';

if (devathon().page === 'teamInvite') {
    new Invite({
        target: document.getElementById('container')
        hydrate: true
    });
}
