export function request(url, data) {
    return fetch(url, Object.assign({
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
    }, data)).then(res => res.json()).then(res => {
        if (res.error) {
            throw new NetworkError(res.message);
        }
        return res;
    });
}

export class NetworkError extends Error {
    constructor(message) {
        super(message);
        this.message = message;
        this.__networkError = true;
    }

    static is(error) {
        return error && error.__networkError;
    }
}