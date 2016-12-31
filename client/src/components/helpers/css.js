export function toString(object) {
    const out = {};
    for (let property in object) {
        if (object.hasOwnProperty(property)) {
            out[property.replace( /([a-z])([A-Z])/g, '$1-$2' ).toLowerCase()] = object[property];
        }
    }
    return Object.keys(out)
        .filter(key => convertValue(out[key]))
        .map(key => `${key}: ${convertValue(out[key])}`).join('; ');
}

function convertValue(value) {
    if (!value) {
        return null;
    }
    if (typeof value !== 'string') {
        value = value + 'px';
    }
    return value;
}
