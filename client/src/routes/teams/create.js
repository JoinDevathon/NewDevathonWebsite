import '../common';
import Create from './create.html';

export default () => {
    return new Create({
        target: document.getElementById('container')
    });
};
