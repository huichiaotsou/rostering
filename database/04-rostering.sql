-- This table stores the rostering of each service
CREATE TABLE service_rostering (
    id                  INT             NOT NULL AUTO_INCREMENT PRIMARY KEY,
    service_date_id     INT             NOT NULL REFERENCES service_dates(id),
    service_type_id     INT             NOT NULL REFERENCES service_types(id),
    user_id             INT             NOT NULL REFERENCES users(id),
    func_id             INT             NOT NULL REFERENCES functions(id),
    team_id             INT             NOT NULL REFERENCES teams(id),
    campus_id           INT             NOT NULL REFERENCES campus(id),
    notes               TEXT            NOT NULL DEFAULT ""
);
