import express from "express";
import config from "./config/config.js";

import * as User from "./server/model/user/user.js";
import * as Admin from "./server/model/user/admin.js";
import { func } from "promisify";

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
