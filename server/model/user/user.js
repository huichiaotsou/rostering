import db from "../../../database/conneciton.js";
import * as userUtils from "./utils.js";

// createUser creates a user in the user table
// zh first name, zh last name, date of birth are nullable in schema
const createUser = async (user) => {
  try {
    const stmt = "INSERT INTO user SET ?";
    const user = {
      first_name_en: user.firstNameEn,
      last_name_en: user.lastNameEn,
      first_name_zh: user.firstNameZh || null,
      last_name_zh: user.lastNameZh || null,
      email: user.email,
      email_verified: false,
      pwd_hash_or_token: user.googleToken || userUtils.hash(user.password),
      date_of_birth: user.dateOfBirth || null,
      create_date: Date.now(),
    };
    const result = await db.Query(stmt, user);

    // return user with auto generated user_id
    user.userID = result.insertId;
    return user;
  } catch (err) {
    return err;
  }
};

const getUserByEmail = async (email) => {
  const stmt = "SELECT * FROM users WHERE email = ?";
  return await db.Query(stmt, email);
};

// setUserTeam stores the user in user_team table
// to indicate that the user belongs to which team(s)
const setUserTeam = async (userTeam) => {
  try {
    const stmtUserTeam = "INSERT INTO user_team SET ?";
    const team = {
      user_id: userTeam.userID,
      team_id: userTeam.teamID,
    };

    await db.Query(stmtUserTeam, team);
  } catch (err) {
    return err;
  }
};

export { createUser, getUserByEmail, setUserTeam };
