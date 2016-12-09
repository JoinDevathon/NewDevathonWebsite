import { query, SQLResponse } from './connect';

interface UserAttributes {
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
