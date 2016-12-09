import { query, SQLResponse } from './connect';
import { Trophy } from '../info/Trophies';

export interface UserAttributes {
    id: number;
    github_id: number;
    beam: string;
    twitch: string;
    twitter: string;
    email: string;
}

interface InsertData {
    insertId: number;
}

export async function createUser(id: number, email: string): Promise<number> {
    const res: SQLResponse<InsertData> = await query<InsertData>("INSERT INTO `users` (`github_id`, `email`) VALUES (?,?)" +
        "ON DUPLICATE KEY UPDATE `email` = ?", [id, email, email]);
    if (res.meta.insertId === 0) { // already exists, but we need the ID so let's look it up
        const user: SQLResponse<UserAttributes> = await query<UserAttributes>("SELECT `id` FROM `users` WHERE `github_id` = ?", [id]);
        return user.data[0].id;
    }
    return res.meta.insertId;
}

export async function getBasicUserById(id: number): Promise<UserAttributes | null> {
    return (await query<UserAttributes>("SELECT `id`,`github_id` FROM `users` WHERE `id` = ?", [id])).data[0] || null;
}

export async function getUserById(id: number): Promise<UserAttributes | null> {
    return (await query<UserAttributes>("SELECT * FROM `users` WHERE `id` = ?", [id])).data[0] || null;
}

export async function getTrophies(id: number): Promise<Trophy[]> {
    return (await query<Trophy>("SELECT * FROM `trophy` WHERE `id` = ?", [id])).data;
}

export async function awardTrophy(id: number, trophy: Trophy): Promise<any> {
    await query<any>("INSERT INTO `trophy` (`id`,`trophy`,`name`) VALUES (?,?,?)", [id, trophy.filename, trophy.name]);
}
