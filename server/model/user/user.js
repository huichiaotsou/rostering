import Db from "../conneciton.js";
import * as userUtils from "./utils.js";

// insertUser creates a user in the user table
// zh first name, zh last name, date of birth are nullable in schema
const insertUser = async (user) => {
  const stmt = "INSERT IGNORE INTO users SET ?";
  const values = {
    first_name_en: user.firstNameEn,
    last_name_en: user.lastNameEn,
    first_name_zh: user.firstNameZh || null,
    last_name_zh: user.lastNameZh || null,
    email: user.email,
    email_verified: false, // default false, change to true when it's verified
    pwd_hash_or_token: user.googleToken || userUtils.hash(user.password),
    date_of_birth: user.dateOfBirth || null,
    create_date: new Date().toISOString().slice(0, 10),
  };

  await Db.executeQuery(stmt, [values]);
};

// getUserByEmail gets the user data by email address
// returns enpty array if not found
const getUserByEmail = async (email) => {
  const stmt = "SELECT * FROM users WHERE email = ?";
  const values = [email];

  const [result] = await Db.executeQuery(stmt, values);

  return result;
};

// insertUserTeams stores the user in user_team table
// to indicate that the user belongs to which team(s)
const insertUserTeams = async (userTeams) => {
  const { userID, teamIDs } = userTeams;
  const stmt = "INSERT IGNORE INTO user_teams (user_id, team_id) VALUES ?";
  await Db.executeQuery(stmt, [teamIDs.map((teamID) => [userID, teamID])]);
};

export { insertUser, getUserByEmail, insertUserTeams };
