import '../common';
import Home from './home.html';

export default () => {
    console.log('doing home');
    return new Home({
        target: document.getElementById('container')
    });
};
