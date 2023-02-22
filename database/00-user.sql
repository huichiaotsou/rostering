-- Define the access table to define the access level of the user (permissions): leader, volunteer, etc.
CREATE TABLE access (
    id                  INT          NOT NULL AUTO_INCREMENT,
    description         VARCHAR(50)  NOT NULL DEFAULT 'no_description_given',
    PRIMARY KEY (id)
);

-- Define the user table to store the user's basic information
CREATE TABLE user (
    id                  INT          NOT NULL AUTO_INCREMENT,
    email               VARCHAR(255) NOT NULL UNIQUE,
    name                VARCHAR(50)  NOT NULL,
    pwd_hash_or_token   TEXT         NOT NULL,
    access_id           INT          NOT NULL,

    PRIMARY KEY (id),
    FOREIGN KEY (access_id) REFERENCES access(id),
    INDEX (access_id)
);

-- Define the func table to store the functions of the users: vox, EG, KB ...
CREATE TABLE func (
    id      INT          NOT NULL AUTO_INCREMENT,
    name    VARCHAR(50)  NOT NULL,
    PRIMARY KEY (id)
);

-- Define the roles table to indicate WHO can be in charge of WHAT(1 user can play more than 1 instrument)
CREATE TABLE roles (
    id         INT AUTO_INCREMENT PRIMARY KEY,
    user_id    INT NOT NULL,
    func_id    INT NOT NULL,

    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (func_id) REFERENCES func(id),
    INDEX (user_id),
    INDEX (func_id),
    UNIQUE KEY (user_id, func_id)
);
