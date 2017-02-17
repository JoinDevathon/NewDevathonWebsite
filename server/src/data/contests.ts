import { query } from './connect';
import { UserAttributes } from './users';

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

export interface ContestEntry extends Contest {
    user: number;
    entry_id: number;
}

export interface ScoredEntry extends ContestEntry {
    score: number;
}

export interface ContestScore {
    id: number | string;
    user: number;
    score: number;
    github_id: number;
    name?: string;
}

export interface ContestFeedback {
    // todo doc
    reviewer: number | string;
}

export async function getAllContests(): Promise<Contest[]> {
    return (await query<Contest>('SELECT * FROM `contests`')).data;
}

export async function getContestFromURL(url: string): Promise<Contest> {
    return (await query<Contest>('SELECT * from `contests` WHERE `url` = ?', [ url ])).data[ 0 ];
}

export async function getEntryAndScores(user: number): Promise<ScoredEntry[]> {
    const entries: ContestEntry[] = await getContestEntries(user);
    return await Promise.all<ScoredEntry>(entries.map(async(entry: ContestEntry) => {
        const asScored: ScoredEntry = <ScoredEntry>entry;
        asScored.score = await getScore(asScored.entry_id);
        return asScored;
    }));
}

export async function getContestEntries(user: number): Promise<ContestEntry[]> {
    return (await query<ContestEntry>('SELECT `user_entry`.`id` as `entry_id`,`contests`.* FROM `user_entry` LEFT JOIN `contests` ON `contests`.`id` = `user_entry`.`contest` WHERE `user_entry`.`user` = ?', [ user ])).data;
}

export async function getScore(id: number): Promise<number> {
    type JustScore = {score: number};
    const score: JustScore[] = (await query<JustScore>('SELECT AVG(`user_entry_feedback`.`value`) as `score` FROM `user_entry` LEFT JOIN `user_entry_feedback` ON `user_entry_feedback`.`entry` = `user_entry`.`id` WHERE `user_entry`.`id` = ?', [ id ])).data;
    if (score.length === 0) {
        return -1;
    }
    return score[ 0 ].score;
}

export async function getFeedback(entry: number): Promise<ContestFeedback[]> {
    return (await query<ContestFeedback>('SELECT `reviewer`,`key`,`value`,`text` FROM `user_entry_feedback` WHERE `entry` = ?', [ entry ])).data;
}

export async function getContestFromEntry(entry: number): Promise<Contest> {
    return (await query<Contest>('SELECT `contests`.*,`user_entry`.`url` as `source_url` FROM `user_entry` LEFT JOIN `contests` ON `contests`.`id` = `user_entry`.`contest` WHERE `user_entry`.`id` = ?', [ entry ])).data[ 0 ];
}

export async function getUserFromEntry(entry: number): Promise<UserAttributes> {
    return (await query<UserAttributes>('SELECT `users`.* FROM `user_entry` LEFT JOIN `users` ON `users`.`id` = `user_entry`.`user` WHERE `user_entry`.`id` = ?', [ entry ])).data[ 0 ];
}

export async function getContestScores(contest: number): Promise<ContestScore[]> {
    return (await query<ContestScore>('SELECT `user_entry`.`id`, `user_entry`.`user`, `users`.`github_id`, AVG(`user_entry_feedback`.`value`) as `score` FROM `user_entry` ' +
        'LEFT JOIN `user_entry_feedback` ON `user_entry_feedback`.`entry` = `user_entry`.`id` ' +
        'LEFT JOIN `users` ON `users`.`id` = `user_entry`.`user` ' +
        'WHERE `user_entry`.`contest` = ? GROUP BY `user_entry`.`id`', [contest])).data;
}

