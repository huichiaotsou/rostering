-- This table stores different service types
CREATE TABLE service_type (
    id                  INT             NOT NULL AUTO_INCREMENT PRIMARY KEY,
    service_name        VARCHAR(50)     NOT NULL, -- Sunday Service, Baptism, Creative Team Night, Heart and Soul

    service_day         VARCHAR(20)     NOT NULL, -- Sunday, Saturday, Tuesday
    
    call_time           TIME            NOT NULL DEFAULT "00:00:00",
    call_time_day       VARCHAR(50)     NOT NULL DEFAULT "", -- e.g. Sunday
    
    preparation_time    TIME            NOT NULL DEFAULT "00:00:00",
    preparation_day     VARCHAR(50)     NOT NULL DEFAULT "", -- e.g. Saturday

    service_time_start  TIME            NOT NULL DEFAULT "07:00:00",
    service_time_end    TIME            NOT NULL DEFAULT "15:45:00",

    team_id             INT             NOT NULL REFERENCES team(id), -- who owns the service/event
    notes               TEXT            NOT NULL
);

-- "service_func" stores the required functions of a service,
-- it will be used with "service_type" to generate the new schedule tables for rostering
-- ref. rostering_sunday table
CREATE TABLE service_func (
    service_type_id     INT         NOT NULL    REFERENCES service_type(id),
    func_id             INT         NOT NULL    REFERENCES func(id),
    is_mandatory        BOOLEAN     NOT NULL    DEFAULT true,
    
    UNIQUE (service_type_id, func_id)
);

-- This table stores all the services that need to be rostered,
-- creation of services is periodically triggered by admins
CREATE TABLE services (
    id                  INT             NOT NULL AUTO_INCREMENT PRIMARY KEY,
    service_type_id     INT             NOT NULL REFERENCES service_type(id),
    service_date        DATE            NOT NULL,

    UNIQUE(service_type_id, servive_date)
);

-- This table stores the availability of volunteers
CREATE TABLE availability (
    user_id                 INT     NOT NULL REFERENCES user(id),
    service_id              INT     NOT NULL REFERENCES services(id),
);

CREATE TABLE max_this_month (
    user_id         INT     NOT NULL REFERENCES user(id),
    year            INT     NOT NULL, -- 2023, 2024 ...
    month           INT     NOT NULL, -- 1, 2, 3, 4, 5 ...
    max_this_month  INT     NOT NULL
);