import { createPool, IPool, IError } from 'mysql';
import {readFileSync} from 'fs';
import { join } from 'path';

import config from '../../config/config';

const debug = require('debug')('Devathon:MySQL');
const pool: IPool = createPool(config.mysql);

export interface SQLResponse<T> {
    data: T[];
    meta: T;
}

export function query<T>(query: string, params?: any[]): Promise<SQLResponse<T>> {
    return new Promise((resolve, reject) => {
        pool.query(query, params, function(err: IError, data: any, meta: any) {
            if (err) {
                return reject(err);
            }
            if (Array.isArray(data)) {
                resolve({
                    data,
                    meta
                });
            } else {
                resolve({
                    meta: data
                });
            }
        });
    });
}

Promise.all([
    query(readFileSync(join(process.cwd(), 'databases', 'users.sql'), 'utf-8')),
    query(readFileSync(join(process.cwd(), 'databases', 'trophy.sql'), 'utf-8')),
    query(readFileSync(join(process.cwd(), 'databases', 'migrations.sql'), 'utf-8')),
]).then(() => debug('Created databases')).catch(err => debug(err));
