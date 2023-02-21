-- access table defines the access level of the user (permissions): leader, volunteer, etc.
CREATE TABLE access(
    id                  INT     NOT NULL AUTO_INCREMENT,
    access_description  TEXT    NOT NULL,
    
    PRIMARY KEY (id)
);

-- user table stores the user's basic information
CREATE TABLE user (
    id        INT     NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (id),

    email     TEXT    NOT NULL UNIQUE,
    name      TEXT    NOT NULL,
    password  TEXT    NOT NULL,

    access_id   INT     NOT NULL,
    FOREIGN KEY (access_id) REFERENCES access(id)
);

-- func table stores the functions of the users: vox, EG, KB ...
CREATE TABLE func (
    id      INT     NOT NULL AUTO_INCREMENT,
    func    TEXT    NOT NULL,

    PRIMARY KEY (id)
);

-- roles table indicates WHO can be in charge of WHAT(1 user can play more than 1 instrument)
CREATE TABLE roles (
    user_id     INT     NOT NULL,
    func_id     INT     NOT NULL,

    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (func_id) REFERENCES func(id)
);

