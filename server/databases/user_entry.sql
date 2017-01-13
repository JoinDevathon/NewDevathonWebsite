CREATE TABLE IF NOT EXISTS `user_entry` (
	`id` INT(255) UNSIGNED NOT NULL AUTO_INCREMENT,
	`user` INT(255) UNSIGNED NOT NULL,
	`contest` INT(255) UNSIGNED NOT NULL,
	PRIMARY KEY (`id`),
	UNIQUE INDEX `user_contest` (`user`, `contest`)
)
COLLATE='latin1_swedish_ci'
ENGINE=InnoDB
;
