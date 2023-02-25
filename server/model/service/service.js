import Db from "../conneciton.js";

const insertCampus = async (campus) => {
  const stmt = "INSERT INTO campus SET ?";
  const values = {
    campus_name: campus.campusName,
  };
  await Db.executeQuery(stmt, [values]);
};

const insertServiceType = async (serviceType) => {
  const stmt = "INSERT IGNORE INTO service_types SET ?";
  const values = {
    service_name: serviceType.serviceName,
    service_day: serviceType.serviceDay,
    call_time: serviceType.callTime,
    call_time_day: serviceType.callTimeDay,
    preparation_time: serviceType.preparationTime,
    preparation_day: serviceType.preparationDay,
    service_time_start: serviceType.serviceTimeStart,
    service_time_end: serviceType.serviceTimeEnd,
    team_id: serviceType.teamID,
    campus_id: serviceType.campusID,
    notes: serviceType.notes,
  };

  await Db.executeQuery(stmt, [values]);
};

const insertServiceFuncs = async (serviceFuncs) => {
  const stmt = `
  INSERT INTO service_funcs 
  (service_type_id, func_id, is_mandatory) 
  VALUES ? 
  ON DUPLICATE KEY UPDATE 
  is_mandatory = VALUES(is_mandatory)`;

  const values = serviceFuncs.funcs.map((f) => [
    serviceFuncs.serviceTypeID,
    f.funcID,
    f.isMandatory,
  ]);

  await Db.executeQuery(stmt, [values]);
};

const insertServiceDates = async (serviceDatesData) => {
  const { serviceTypeID, serviceDates } = serviceDatesData;

  const stmt = `
  INSERT INTO service_dates 
  (service_type_id, service_date, notes) 
  VALUES ? 
  ON DUPLICATE KEY UPDATE 
  notes = VALUES(notes)`;

  const values = serviceDates.map(({ serviceDate, notes }) => [
    serviceTypeID,
    serviceDate,
    notes,
  ]);

  await Db.executeQuery(stmt, [values]);
};

const insertServiceSlots = async (serviceSlotsData) => {
  const { serviceTypeID, serviceSlots } = serviceSlotsData;

  const stmt = `
  INSERT INTO service_slots 
  (service_type_id, service_slot, notes) 
  VALUES ? 
  ON DUPLICATE KEY UPDATE 
  notes=VALUES(notes)
  `;
  const values = serviceSlots.map((slot) => [
    serviceTypeID,
    slot.serviceSlot,
    slot.notes,
  ]);

  await Db.executeQuery(stmt, [values]);
};

export {
  insertCampus,
  insertServiceType,
  insertServiceFuncs,
  insertServiceDates,
  insertServiceSlots,
};
