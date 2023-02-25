-- This table stores the rostering of each service
CREATE TABLE rosters (
    id                  INT     NOT NULL AUTO_INCREMENT PRIMARY KEY,
    campus_id           INT     NOT NULL REFERENCES campus(id),
    team_id             INT     NOT NULL REFERENCES teams(id),
    user_id             INT     NOT NULL REFERENCES users(id),
    service_type_id     INT     NOT NULL REFERENCES service_types(id),
    service_date_id     INT     NOT NULL REFERENCES service_dates(id),
    func_id             INT     NOT NULL REFERENCES functions(id),
    notes               TEXT    NOT NULL DEFAULT "",

    UNIQUE(user_id, service_type_id, service_date_id, func_id)
);

CREATE TABLE roster_slots (
    id                  INT         NOT NULL AUTO_INCREMENT PRIMARY KEY,
    roster_id           INT         NOT NULL REFERENCES rosters(id),
    service_slot_id     INT         NOT NULL REFERENCES service_slots(id),
    
    UNIQUE(roster_id, service_slot_id)
);