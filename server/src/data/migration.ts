import { query, SQLResponse } from './connect';
import { getUserFromName, GithubUser } from '../connect/github';

const debug = require('debug')('Devathon:Migrations');

interface MigrationSQL {
    migration: string;
}

interface Migration {
    func: () => Promise<any>;
    name: string;
}

const toMigrate: Migration[] = [];

export async function doMigrations() {
    const res: SQLResponse<MigrationSQL> = await query<MigrationSQL>('SELECT `migration` FROM `migrations`');
    const migrations: string[] = res.data.map((mig: MigrationSQL) => mig.migration);
    for (let i = 0; i < toMigrate.length; i++) {
        const migration: Migration = toMigrate[i];
        if (migrations.indexOf(migration.name) < 0) {
            debug(`Running migration ${migration.name}..`);
            await migration.func();
            await query("INSERT INTO `migrations` (`migration`) VALUES (?)", [migration.name]);
        }
    }
}

toMigrate.push({
    name: 'create_user_github_id',
    func: async function() {
        await query("ALTER TABLE `users` ADD COLUMN `github_id` INT(255) NOT NULL DEFAULT '0' AFTER `id`");
        type user = {username: string};
        const users: SQLResponse<user> = await query<user>("SELECT `username` FROM `users`");
        await Promise.all(users.data.map(async (user: user) => {
            const githubUser: GithubUser = await getUserFromName(user.username);
            await query("UPDATE `users` SET `github_id` = ? WHERE `username` = ?", [githubUser.id, user.username]);
        }));
        await query("ALTER TABLE `users` DROP COLUMN `username`");
    }
});

toMigrate.push({
    name: 'user_github_id_unique',
    func: async function() {
        await query("ALTER TABLE `users` ADD UNIQUE INDEX `github_id` (`github_id`)");
    }
});

toMigrate.push({
    name: 'trophy_to_filename',
    func: async function() {
        await query("ALTER TABLE `trophy` CHANGE COLUMN `trophy` `filename` VARCHAR(255) NULL DEFAULT NULL AFTER `id`")
    }
});

toMigrate.push({
    name: 'user_admin_bit',
    func: async function() {
        await query("ALTER TABLE `users` ADD COLUMN `admin` BIT(1) NOT NULL DEFAULT b'0' AFTER `email`");
    }
});

toMigrate.push({
    name: 'user_entry_url',
    func: async function() {
        await query("ALTER TABLE `user_entry` ADD COLUMN `url` VARCHAR(255) NOT NULL AFTER `contest`");
    }
});
