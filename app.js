import express from "express";
import config from "./config/config.js";

import * as User from "./server/model/user/user.js";
import * as Admin from "./server/model/user/admin.js";
import * as Service from "./server/model/service/service.js";

const { port } = config.server;

// Build app
const app = express();
app.listen(port, () => {
  console.log("app is listening on port: ", port);
});

// Routes

// ********************************************
//                    TEST
// ********************************************
// CREATE USER
// const user = {
//   firstNameEn: "firstNameEn",
//   lastNameEn: "lastNameEn",
//   firstNameZh: "firstNameZh",
//   lastNameZh: "lastNameZh",
//   email: "email2",
//   password: "password",
//   dateOfBirth: "1990-09-09",
// };
// const res = await User.insertUser(user);
// console.log(res);

// *************
//    USER
// *************

// GET USER
const email1 = "huichiao.tsou@gmail.com";
const email2 = "huichiao.tsou@gmail";
// const res = await User.getUserByEmail("");
// console.log(res);

// CREATE TEAMS
// const teams = ["worship", "sound"];
// await Admin.insertTeams(teams);

// INSERT USER_TEAMS
const userTeams = {
  userID: 1,
  teamIDs: [1, 2],
};
// await User.insertUserTeams(userTeams);

// INSERT PERMISSIONS
const permissions = [
  {
    userID: 1,
    permissions: [
      { teamID: 1, permissionName: "admin" },
      { teamID: 2, permissionName: "admin" },
    ],
  },
  {
    userID: 18,
    permissions: [
      { teamID: 1, permissionName: "admin" },
      { teamID: 2, permissionName: "volunteer" },
    ],
  },
];
// await Admin.insertUserPermissions(permissions);

// INSERT FUNCTIONS
const functions = ["Vox 1", "Vox 2", "Vox 3", "EG 1", "MD"];
// await Admin.insertFunctions(functions);

// INSERT user_funcs
const userFuncs = [
  {
    userID: 1,
    funcIDs: [1, 2, 3],
  },
  {
    userID: 18,
    funcIDs: [3, 5],
  },
];
// await Admin.insertUserFuncs(userFuncs);

// *************
//   SERVICE
// *************

// INSERT CAMPUS
const campus = {
  campusName: "Taipei Campus",
};
// await Service.insertCampus(campus);

// INSERT SERVICE TYPE
const serviceType = {
  serviceName: "Sunday Service",
  serviceDay: "Sunday",
  callTime: "09:00:00",
  callTimeDay: "Sunday",
  preparationTime: "10:00:00",
  preparationDay: "Saturday",
  serviceTimeStart: "11:00:00",
  serviceTimeEnd: "12:30:00",
  teamID: 1,
  campusID: 1,
  notes: "Some notes about this service type",
};
// await Service.insertServiceType(serviceType);

// INSERT SERVICE FUNCS
const serviceFuncs = {
  serviceTypeID: 7,
  funcs: [
    { funcID: 1, isMandatory: true },
    { funcID: 2, isMandatory: true },
    { funcID: 3, isMandatory: false },
  ],
};
// await Service.insertServiceFuncs(serviceFuncs);

// CREATE SERVICE DATES
const serviceDates = {
  serviceTypeID: 7,
  serviceDates: [
    { serviceDate: "2023-03-01", notes: "note 1" },
    { serviceDate: "2023-03-08", notes: "note 2" },
    { serviceDate: "2023-03-15", notes: "note 3" },
  ],
};

// await Service.insertServiceDates(serviceDates);

// CREATE SERVICE SLOTS
const serviceSlots = {
  serviceTypeID: 7,
  serviceSlots: [
    { serviceSlot: "09:30", notes: "note 1" },
    { serviceSlot: "11:30", notes: "note 2" },
    { serviceSlot: "14:00", notes: "note 3" },
  ],
};

await Service.insertServiceSlots(serviceSlots);
