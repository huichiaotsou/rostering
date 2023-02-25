CREATE TABLE campus (
    id              INT             NOT NULL AUTO_INCREMENT PRIMARY KEY,
    campus_name     VARCHAR(50)     NOT NULL UNIQUE
);

-- This table stores different service types
CREATE TABLE service_types (
    id                  INT             NOT NULL AUTO_INCREMENT PRIMARY KEY,
    service_name        VARCHAR(50)     NOT NULL, -- Sunday Service, Baptism, Creative Team Night, Heart and Soul

    service_day         VARCHAR(20)     NOT NULL, -- Sunday, Saturday, Tuesday
    
    call_time           TIME            NOT NULL DEFAULT "00:00:00",
    call_time_day       VARCHAR(50)     NOT NULL DEFAULT "", -- e.g. Sunday
    
    preparation_time    TIME            NOT NULL DEFAULT "00:00:00",
    preparation_day     VARCHAR(50)     NOT NULL DEFAULT "", -- e.g. Saturday

    service_time_start  TIME            NOT NULL DEFAULT "07:00:00",
    service_time_end    TIME            NOT NULL DEFAULT "15:45:00",

    team_id             INT             NOT NULL REFERENCES teams(id), -- who owns the service/event
    campus_id           INT             NOT NULL REFERENCES campus(id), -- happens in which campus
    notes               TEXT            NOT NULL DEFAULT "",

    -- there can be same service type but owned by different teams, e.g. Sunday Service by Worship & Sound
    UNIQUE(service_name, team_id)
);

-- "service_funcs" stores the required functions of a service,
-- it will be used with "service_name" to generate the new schedule tables for rostering
-- ref. rostering_sunday table
CREATE TABLE service_funcs (
    service_type_id     INT         NOT NULL    REFERENCES service_types(id),
    func_id             INT         NOT NULL    REFERENCES functions(id),
    is_mandatory        BOOLEAN     NOT NULL    DEFAULT true,
    
    UNIQUE (service_type_id, func_id)
);

-- This table stores all the services that need to be rostered;
-- creation of coming services is periodically triggered by admins
CREATE TABLE service_dates (
    id                  INT             NOT NULL AUTO_INCREMENT PRIMARY KEY,
    service_date        DATE            NOT NULL,
    service_type_id     INT             NOT NULL REFERENCES service_types(id),
    notes               TEXT            NOT NULL DEFAULT "",

    UNIQUE(service_type_id, service_date)
);

-- creation of service slots should be triggered by the creation of service_dates
CREATE TABLE service_slots (
    id                  INT             NOT NULL AUTO_INCREMENT PRIMARY KEY,
    service_slot        VARCHAR(255)    NOT NULL,
    service_type_id     INT             NOT NULL REFERENCES service_types(id),

    notes               TEXT            NOT NULL DEFAULT "",

    UNIQUE(service_type_id, service_slot)
);