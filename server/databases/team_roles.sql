CREATE TABLE IF NOT EXISTS `team_roles` (
	`team_id` INT(255) NOT NULL,
	`user_id` INT(255) NOT NULL,
	`role` VARCHAR(64) NOT NULL,
	UNIQUE INDEX `team_id_user_id` (`team_id`, `user_id`)
)
ENGINE=InnoDB
;
