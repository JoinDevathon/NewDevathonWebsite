import { client } from './connect';
import { getUserFromId } from '../connect/github';

// dn = devathon
// dn:uc = user cache

// all the code in here will be super messy while redis decides not to do promises :(

export function getUserName(id: number): Promise<string> {
    return new Promise((resolve, reject) => {
        client.get(`dn:uc:${id}`, (error: Error, value: string | null) => {
            if (error) {
                return reject(error);
            }
            if (value) {
                return resolve(value);
            }
            resolve(getUserFromId(id).then(user => new Promise((resolve, reject) => {
                if (!user.login) {
                    return resolve("Unknown");
                }
                client.set(`dn:uc:${id}`, user.login || "Unknown", 'EX', 7 * 24 * 60 * 60, (err: Error) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(user.login);
                }); // store for 1 week (probably could store longer..)
            })));
        });
    });
}
