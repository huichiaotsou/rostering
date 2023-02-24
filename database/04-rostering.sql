-- This table stores the rostering of each service
CREATE TABLE service_rostering (
    id                  INT             NOT NULL AUTO_INCREMENT PRIMARY KEY,
    campus_id           INT             NOT NULL REFERENCES campus(id),
    service_date_id     INT             NOT NULL REFERENCES service_dates(id),
    service_type_id     INT             NOT NULL REFERENCES service_types(id),
    team_id             INT             NOT NULL REFERENCES teams(id),
    user_id             INT             NOT NULL REFERENCES users(id),
    func_id             INT             NOT NULL REFERENCES functions(id),
    notes               TEXT            NOT NULL DEFAULT ""
);
