import { query, SQLResponse } from './connect';

export interface Contest {
    id: number;
    name: string;
    url: string;
    description: string;
    status: string;
    color: string;
    start: Date;
    end: Date;
}

export async function getAllContests(): Promise<Contest[]> {
    return (await query<Contest>('SELECT * FROM `contests`')).data;
}

export async function getContestFromURL(url: string): Promise<Contest> {
    return (await query<Contest>('SELECT * from `contests` WHERE `url` = ?', [url])).data[0];
}

