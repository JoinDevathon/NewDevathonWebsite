import { createPool, IPool, IError } from 'mysql';

import config from '../../config/config';

const pool: IPool = createPool(config.mysql);

export interface SQLResponse<T> {
    data: T[];
    meta: any;
}

export function query<T>(query: string, params?: any[]): Promise<SQLResponse<T>> {
    return new Promise((resolve, reject) => {
        pool.query(query, params, function(err: IError, data: any, meta: any) {
            if (err) {
                return reject(err);
            }
            resolve({
                data,
                meta
            });
        });
    });
}
