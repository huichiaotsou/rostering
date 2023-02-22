-- Define the user table to store the user's basic information
CREATE TABLE user (
    id                  INT          NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name_en       VARCHAR(50)  NOT NULL DEFAULT "",
    last_name_en        VARCHAR(50)  NOT NULL DEFAULT "",
    first_name_zh       VARCHAR(50)  NOT NULL DEFAULT "",
    last_name_zh        VARCHAR(50)  NOT NULL DEFAULT "",
    email               VARCHAR(255) NOT NULL UNIQUE,
    email_verified      BOOLEAN      NOT NULL DEFAULT false,
    pwd_hash_or_token   TEXT         NOT NULL, -- password hash or OAuth login token
    date_of_birth       DATE         NULL,
    create_date         DATE         NOT NULL,
);

-- Define the team table to store the teams of the users: worship, sound...
-- team is defined by the admins
CREATE TABLE team (
    id          INT         AUTO_INCREMENT PRIMARY KEY,
    team_name   VARCHAR(50) NOT NULL
);

-- Define the user_team table to indicate WHO is in WHICH TEAM
-- 1 user can be in more than 1 team
CREATE TABLE user_team (
    user_id    INT NOT NULL REFERENCES user(id),
    team_id    INT NOT NULL REFERENCES team(id),

    UNIQUE (user_id, team_id)
);

-- Define the access table to store the access level along with team(s)
-- access is defined by the admin
CREATE TABLE access (
    id              INT          NOT NULL AUTO_INCREMENT PRIMARY KEY,
    team_id         INT          NOT NULL REFERENCES team(id),
    user_id         INT          NOT NULL REFERENCES user(id),
    access_level    VARCHAR(50)  NOT NULL -- admin, leader, volunteer...
);

-- Define the func table to store the functions of the users: Vox 1, Vox 2, KB 1, MD...
-- 1 user can take more than 1 function
-- func list is defined by the admin
CREATE TABLE func (
    id          INT          NOT NULL AUTO_INCREMENT PRIMARY KEY,
    func_name   VARCHAR(50)  NOT NULL
);

-- Define the user_func table to indicate WHO can be in charge of WHAT;
-- 1 user can be in charge of more than 1 instrument/function
-- (who can play what is defined by the admins)
-- user_func is defined by the admin
CREATE TABLE user_func (
    user_id    INT NOT NULL REFERENCES user(id),
    func_id    INT NOT NULL REFERENCES func(id),

    UNIQUE (user_id, func_id)
);
