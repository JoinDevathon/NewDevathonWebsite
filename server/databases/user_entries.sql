CREATE TABLE IF NOT EXISTS `user_entries` (
	`id` INT(255) UNSIGNED NOT NULL AUTO_INCREMENT,
	`user_id` INT(255) UNSIGNED NOT NULL,
	`contest_id` INT(255) UNSIGNED NOT NULL,
	`creative_score` DOUBLE UNSIGNED NOT NULL DEFAULT '0',
	`creative_res` TEXT NULL,
	`originality_score` DOUBLE UNSIGNED NOT NULL DEFAULT '0',
	`originality_res` TEXT NULL,
	`impl_score` DOUBLE UNSIGNED NOT NULL DEFAULT '0',
	`impl_res` TEXT NULL,
	PRIMARY KEY (`id`),
	UNIQUE INDEX `user_id_contest_id` (`user_id`, `contest_id`)
)
COLLATE='latin1_swedish_ci'
ENGINE=InnoDB
;
