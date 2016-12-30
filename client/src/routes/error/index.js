import '../common';
import Error from './error.html';

export default () => new Error({
    target: document.getElementById('container')
});

