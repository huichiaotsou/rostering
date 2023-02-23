import Db from "../conneciton.js";
import * as userUtils from "./utils.js";

// createUser creates a user in the user table
// zh first name, zh last name, date of birth are nullable in schema
const createUser = async (user) => {
  const stmt = "INSERT IGNORE INTO users SET ?";
  const values = [
    {
      first_name_en: user.firstNameEn,
      last_name_en: user.lastNameEn,
      first_name_zh: user.firstNameZh || null,
      last_name_zh: user.lastNameZh || null,
      email: user.email,
      email_verified: false,
      pwd_hash_or_token: user.googleToken || userUtils.hash(user.password),
      date_of_birth: user.dateOfBirth || null,
      create_date: new Date().toISOString().slice(0, 10),
    },
  ];

  const conn = await Db.pool.getConnection();
  const [result] = await Db.executeQuery(conn, stmt, values);

  // return user with auto generated user_id
  user.userID = result.insertId;
  return user;
};

const getUserByEmail = async (email) => {
  const stmt = "SELECT * FROM users WHERE email = ?";
  const values = [email];

  const conn = await Db.pool.getConnection();
  const [result] = await Db.executeQuery(conn, stmt, values);

  return result;
};

// insertUserTeams stores the user in user_team table
// to indicate that the user belongs to which team(s)
const insertUserTeams = async (userTeams) => {
  try {
    const stmt = "INSERT INTO user_teams (user_id, team_id) VALUES ( ? , ? );";
    const values = userTeams.teamIDs.map((teamID) => [
      userTeams.userID,
      teamID,
    ]);

    const conn = await Db.pool.getConnection();
    await Db.executeQuery(conn, stmt, values);
  } catch (err) {
    return err;
  }
};

export { createUser, getUserByEmail, insertUserTeams };
