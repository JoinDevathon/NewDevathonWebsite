export function devathon(data) {
    if (data) {
        return Object.assign({}, data, _devathon.state);
    }
    return _devathon.state;
}
