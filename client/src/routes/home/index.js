import '../common';
import Home from './home.html';

export default () => {
    return new Home({
        target: document.getElementById('container')
    });
};
