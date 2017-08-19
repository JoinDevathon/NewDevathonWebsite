import { query, SQLResponse } from './connect';
import { Trophy } from '../info/Trophies';

export interface UserAttributes {
    id: number;
    github_id: number;
    beam: string;
    twitch: string;
    twitter: string;
    email: string;
    admin: Buffer | boolean;
}

interface InsertData {
    insertId: number;
}

export interface ShippingInfo {
    fullname: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    zip: string;
    country: string;
}

export async function createUser(id: number, email: string): Promise<number> {
    const res: SQLResponse<InsertData> = await query<InsertData>("INSERT INTO `users` (`github_id`, `email`) VALUES (?,?)" +
        "ON DUPLICATE KEY UPDATE `email` = ?", [ id, email, email ]);
    if (res.meta.insertId === 0) { // already exists, but we need the ID so let's look it up
        const user: SQLResponse<UserAttributes> = await query<UserAttributes>("SELECT `id`,`email` FROM `users` WHERE `github_id` = ?", [ id ]);
        if (email && user.data[ 0 ].email !== email) {
            await query<any>("UPDATE `users` (`email`) VALUES (?) WHERE `id` = ?", [ email, user.data[ 0 ].id ]);
        }
        return user.data[ 0 ].id;
    }
    return res.meta.insertId;
}

export async function getBasicUserById(id: number): Promise<UserAttributes | null> {
    return (await query<UserAttributes>("SELECT `id`,`github_id` FROM `users` WHERE `id` = ?", [ id ])).data[ 0 ] || null;
}

export async function getUserById(id: number): Promise<UserAttributes | null> {
    const user: UserAttributes = (await query<UserAttributes>("SELECT * FROM `users` WHERE `id` = ?", [ id ])).data[ 0 ] || null;
    if (user) {
        user.admin = !!(user.admin as Buffer)[ 0 ];
    }
    return user;
}

export async function getTrophies(id: number): Promise<Trophy[]> {
    return (await query<Trophy>("SELECT * FROM `trophy` WHERE `id` = ?", [ id ])).data;
}

export async function awardTrophy(id: number, trophy: Trophy): Promise<any> {
    await query<any>("INSERT INTO `trophy` (`id`,`trophy`,`name`) VALUES (?,?,?)", [ id, trophy.filename, trophy.name ]);
}

export async function updateMedia(id: number, beam: string, twitch: string, twitter: string) {
    await query<any>("UPDATE `users` SET `beam` = ?, `twitch` = ?, `twitter` = ? WHERE `id` = ?", [ beam, twitch, twitter, id ]);
}

export async function getShippingInfo(id: number, returnNull: boolean = false): Promise<ShippingInfo> {
    const data: ShippingInfo[] = (await query<ShippingInfo>("SELECT `fullname`,`address1`,`address2`,`city`,`state`,`zip`,`country` FROM `user_shipping` WHERE `id` = ?", [ id ])).data;
    if (data.length === 0) {
        if (returnNull) {
            return null;
        }
        return {
            address1: '',
            address2: '',
            city: '',
            country: '',
            fullname: '',
            state: '',
            zip: '',
        };
    }
    return data[ 0 ];
}

export async function setShippingInfo(id: number, data: ShippingInfo) {
    await query<any>("REPLACE INTO `user_shipping` (`id`,`fullname`,`address1`,`address2`,`city`,`state`,`zip`,`country`) VALUES (?,?,?,?,?,?,?,?)",
        [ id, data.fullname, data.address1, data.address2, data.city, data.state, data.zip, data.country ]);
}