CREATE DATABASE interview;
USE interview;

CREATE TABLE user(
	user_id				INT UNSIGNED AUTO_INCREMENT,
	email					VARCHAR(255) NOT NULL,
	password				VARCHAR(255) NOT NULL,
	date_created		INT UNSIGNED NULL,
	PRIMARY KEY(user_id);
);

CREATE TRIGGER created_user BEFORE INSERT ON user FOR EACH ROW
BEGIN
	IF (new.date_created IS NULL) THEN
		SET new.date_created = UNIX_TIMESTAMP();
	END IF;
END;