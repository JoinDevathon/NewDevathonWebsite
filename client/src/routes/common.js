if ('document' in this) {
    const container = document.getElementById('container');
    if (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}

export function devathon(data) {
    if (data) {
        return Object.assign({}, data, _devathon.state);
    }
    return _devathon.state;
}
