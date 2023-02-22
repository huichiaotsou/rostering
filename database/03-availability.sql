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