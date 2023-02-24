
-- availability_slots provides a more detailed service arrangement, with slot 0 representing all slots
CREATE TABLE availability_slots (
    id                  INT                 NOT NULL AUTO_INCREMENT PRIMARY KEY,
    slot                INT                 NOT NULL,
    slot_description    VARCHAR(255)        NOT NULL
);

-- This table stores the availabilities of volunteers for a specific service date and availability slot.
-- If sub_availability_id is 0, it means the volunteer is available for all slots.
CREATE TABLE availabilities (
    user_id                 INT     NOT NULL REFERENCES user(id),
    service_date_id         INT     NOT NULL REFERENCES service_dates(id),
    sub_availability_id     INT     NOT NULL DEFAULT 0 REFERENCES availability_slots(id)
);

-- Stores monthly max serve times for each user
CREATE TABLE monthly_max_times (
    user_id         INT     NOT NULL REFERENCES user(id),
    year            INT     NOT NULL, -- 2023, 2024 ...
    month           INT     NOT NULL, -- 1, 2, 3, 4, 5 ...
    max_this_month  INT     NOT NULL
);