CREATE TABLE IF NOT EXISTS `user_entries` (
	`id` INT(255) UNSIGNED NOT NULL AUTO_INCREMENT,
	`user_id` INT(255) UNSIGNED NOT NULL,
	`contest_id` INT(255) UNSIGNED NOT NULL,
	`score` DOUBLE UNSIGNED NOT NULL DEFAULT '0',
	PRIMARY KEY (`id`),
	UNIQUE INDEX `user_id_contest_id` (`user_id`, `contest_id`)
)
ENGINE=InnoDB
;
