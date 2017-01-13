CREATE TABLE IF NOT EXISTS `user_entry_feedback` (
  `entry` INT(255) UNSIGNED NOT NULL,
  `reviewer` INT(255) NOT NULL,
  `key` VARCHAR(16) NOT NULL,
  `value` FLOAT NOT NULL,
  `text` TEXT NOT NULL,
  UNIQUE INDEX `entry_reviewer_key` (`entry`, `reviewer`, `key`),
  INDEX `entry` (`entry`)
)
  COLLATE='latin1_swedish_ci'
  ENGINE=InnoDB
;
