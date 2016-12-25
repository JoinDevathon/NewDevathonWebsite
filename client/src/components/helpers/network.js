export async function request(url, data) {
    const res = await (await fetch(url, Object.assign({
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
    }, data))).json();
    if (res.error) {
        throw new NetworkError(res.message);
    }
    return res;
}

export class NetworkError extends Error {
    constructor(message) {
        super(message);
        this.message = message;
    }
}