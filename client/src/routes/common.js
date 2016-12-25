// this file has to be requireable by node.

let maybeData;

exports.setDevathonData = function (data) {
    maybeData = data;
};

exports.devathon = function (defaults) {
    if (maybeData) {
        return Object.assign({}, maybeData.state, defaults || {});
    } else if ('_devathon' in global) {
        return Object.assign({}, _devathon.state, defaults || {});
    } else {
        throw new Error('Devathon data not available!');
    }
};
