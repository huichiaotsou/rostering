import * as userModle from "../../model/user/user";

const getUserByEmail = async (email) => {
  // user, user_team, access table
};

const singUp = async (user) => {
  // Verify if the user exists already
  const existingUser = await userModle.getUserByEmail(user.email);
  if (existingUser.length > 0) {
    return { error: "user exists" };
  }

  // Store user
  await userModle.createUser(user);
};

const setUserTeam = async (userTeam) => {};
const singIn = async () => {};
