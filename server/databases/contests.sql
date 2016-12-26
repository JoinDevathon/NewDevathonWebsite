CREATE TABLE IF NOT EXISTS `contests` (
	`id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(255) NOT NULL,
	`url` VARCHAR(255) NOT NULL,
	`description` VARCHAR(255) NOT NULL,
	`status` VARCHAR(255) NOT NULL,
	`color` VARCHAR(10) NOT NULL,
	`start` DATETIME NOT NULL,
	`end` DATETIME NOT NULL,
	PRIMARY KEY (`id`),
	UNIQUE INDEX `url` (`url`)
)
COLLATE='utf8_general_ci'
ENGINE=InnoDB
;