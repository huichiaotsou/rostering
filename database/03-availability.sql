-- This table stores the availabilities of volunteers for a specific service date and availability slot.
CREATE TABLE availability (
    user_id                 INT     NOT NULL REFERENCES user(id),
    service_date_id         INT     NOT NULL REFERENCES service_dates(id),
    service_slot_id         INT     NOT NULL REFERENCES service_slots(id)
);

-- Stores monthly max serve times for each user
CREATE TABLE monthly_max_times (
    user_id         INT     NOT NULL REFERENCES user(id),
    year            INT     NOT NULL, -- 2023, 2024 ...
    month           INT     NOT NULL, -- 1, 2, 3, 4, 5 ...
    max_this_month  INT     NOT NULL
);