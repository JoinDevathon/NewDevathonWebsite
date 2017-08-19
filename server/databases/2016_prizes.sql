CREATE TABLE IF NOT EXISTS `2016_prizes` (
	`id` INT(255) NOT NULL,
	`size` VARCHAR(8) NOT NULL,
	UNIQUE INDEX `id` (`id`)
)
COLLATE='latin1_swedish_ci'
ENGINE=InnoDB
;

