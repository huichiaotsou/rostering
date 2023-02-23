import express from "express";
import config from "./config/config.js";

import * as User from "./server/model/user/user.js";

const { port } = config.server;

// Build app
const app = express();
app.listen(port, () => {
  console.log("app is listening on port: ", port);
});

// Routes

// test

// USER
// const user = {
//   firstNameEn: "firstNameEn",
//   lastNameEn: "lastNameEn",
//   firstNameZh: "firstNameZh",
//   lastNameZh: "lastNameZh",
//   email: "email",
//   password: "password",
//   dateOfBirth: "1990-09-09",
// };
// const res = await User.createUser(user);
// console.log(res);

// GET USER
// const res = await User.getUserByEmail("email");
// console.log(res);

// USER_TEAMS
const userTeams = {
  userID: 1,
  teamIDs: [1, 2, 3],
};

const res = await User.insertUserTeams(userTeams);
console.log(res);
