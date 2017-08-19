import { query, SQLResponse } from './connect';
import { UserAttributes } from './users';

export interface TeamAttributes {
    id: number;
    name: string;
    url: string;
    description: string;
    image: Buffer;
}

export interface TeamWithRole extends TeamAttributes {
    role: string;
}

export interface UserWithRole extends UserAttributes {
    role: string;
    username: string;
}

interface InsertData {
    insertId: number;
}

export async function createTeam(name: string, url: string, description: string, image: Buffer): Promise<number> {
    const res = await query<InsertData>("INSERT INTO `teams` (`name`,`url`,`description`,`image`) VALUES (?,?,?,?)", [name, url, description, image]);
    return res.meta.insertId;
}

export async function setTeamRole(user: number, team: number, role: string): Promise<void> {
    await query<any>("INSERT INTO `team_roles` (`user_id`,`team_id`,`role`) VALUES (?,?,?) ON DUPLICATE KEY UPDATE `role` = ?", [user, team, role, role]);
}

export async function getTeam(url: string): Promise<TeamAttributes | undefined> {
    return (await query<TeamAttributes>("SELECT `name`,`url`,`description`,`id` FROM `teams` WHERE `url` = ?", [url])).data[0];
}

export async function getTeamMembers(id: number): Promise<UserWithRole[]> {
    return (await query<UserWithRole>("SELECT `team_roles`.`role`, `users`.`id`,`users`.`github_id` FROM `team_roles` LEFT JOIN `users` ON `users`.`id` = `team_roles`.`user_id` WHERE `team_roles`.`team_id` = ?", [id])).data;
}

export async function getTeamsForUser(user: number): Promise<TeamWithRole[]> {
    return (await query<TeamWithRole>("SELECT `team_roles`.`role`, `teams`.`name`,`teams`.`url`,`teams`.`description`,`teams`.`id` FROM `team_roles` LEFT JOIN `teams` ON `teams`.`id` = `team_roles`.`team_id` WHERE `team_roles`.`user_id` = ?", [user])).data;
}

export async function getTeamImage(url: string): Promise<Buffer> {
    const teams: TeamAttributes[] = (await query<TeamAttributes>("SELECT `image` FROM `teams` WHERE `url` = ?", [url])).data;
    if (teams.length > 0) {
        return teams[0].image;
    }
    return Buffer.alloc(0);
}
