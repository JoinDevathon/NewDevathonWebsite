import * as Hashids from 'hashids';
import config from '../../config/config';
import { RouteError } from '../routes/utils';

const hasher = new Hashids(config.hashesSalt, 5);

export function hash(id: number): string {
    return hasher.encode(id);
}

export function unhash(hash: string): number {
    const numbers: number[] = hasher.decode(hash);
    if (numbers.length !== 1) {
        throw new RouteError('Invalid id.');
    }
    return numbers[0];
}
