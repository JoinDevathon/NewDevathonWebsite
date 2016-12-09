// this file has to be requireable by node.

let maybeData;

exports.setDevathonData = function (data) {
    maybeData = data;
};

exports.devathon = function (defaults) {
    if (maybeData) {
        return maybeData.state;
    } else if ('_devathon' in global) {
        return _devathon.state;
    } else {
        return defaults;
    }
};
