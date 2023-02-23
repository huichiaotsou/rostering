-- This table stores the rostering of each Sunday service
CREATE TABLE rostering_sunday_services (
    service_id  INT         NOT NULL REFERENCES services(id),
    notes       TEXT        NOT NULL DEFAULT ""
    `Vox 1`     INT         NOT NULL REFERENCES user(id),
    `Vox 2`     INT         NOT NULL REFERENCES user(id),
    `Vox 3`     INT         NOT NULL REFERENCES user(id),
    `Vox 4`     INT         NOT NULL REFERENCES user(id),
    `Vox 5`     INT         NOT NULL REFERENCES user(id),
    `Choir`     BOOLEAN     NOT NULL DEFAULT false,
    `MD`        INT         NOT NULL REFERENCES user(id),
    `KB1`       INT         NOT NULL REFERENCES user(id),
    `KB2`       INT         NOT NULL REFERENCES user(id),
    `AG`        INT         NOT NULL REFERENCES user(id),
    `EG1`       INT         NOT NULL REFERENCES user(id),
    `EG2`       INT         NOT NULL REFERENCES user(id),
    `Bass`      INT         NOT NULL REFERENCES user(id),
    `Drums`     INT         NOT NULL REFERENCES user(id),
);

-- This table stores all the services that need to be rostered;
-- creation of coming services is periodically triggered by admins
CREATE TABLE services (
    id                  INT             NOT NULL AUTO_INCREMENT PRIMARY KEY,
    service_type_id     INT             NOT NULL REFERENCES service_type(id),
    service_date        DATE            NOT NULL,

    UNIQUE(service_type_id, servive_date)
);