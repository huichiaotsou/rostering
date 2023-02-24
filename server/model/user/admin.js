import Db from "../conneciton.js";

// insertTeams takes an array of teams and batch inserts them in the teams table
const insertTeams = async (teams) => {
  let stmt = "INSERT IGNORE INTO teams (team_name) VALUES ?";
  await Db.executeQuery(stmt, [teams.map((t) => [t])]);
};

// insertUserPermissions stores the permission of the users in the permissions table
const insertUserPermissions = async (userPermissions) => {
  const stmt = `
  INSERT INTO permissions 
  (user_id, team_id, permission_name) 
  VALUES ? 
  ON DUPLICATE KEY 
  UPDATE permission_name = VALUES(permission_name)`;

  const values = userPermissions.reduce((acc, { userID, permissions }) => {
    const userTeamPermSet = permissions.map((p) => [
      userID,
      p.teamID,
      p.permissionName,
    ]);
    return acc.concat(userTeamPermSet);
  }, []);

  await Db.executeQuery(stmt, [values]);
};

// insertFunctions stores the list of functions in the func table
const insertFunctions = async (functions) => {
  let stmt = "INSERT IGNORE INTO functions (func_name) VALUES ?";
  await Db.executeQuery(stmt, [functions.map((f) => [f])]);
};

// insertUserFuncs stores the functions of a user in the user_func table
const insertUserFuncs = async (userFuncs) => {
  const stmt = "INSERT IGNORE INTO user_funcs (user_id, func_id) VALUES ?";

  const values = userFuncs.reduce((acc, { userID, funcIDs }) => {
    const userFuncPairs = funcIDs.map((funcID) => [userID, funcID]);
    return acc.concat(userFuncPairs);
  }, []);

  await Db.executeQuery(stmt, [values]);
};

export { insertTeams, insertUserPermissions, insertFunctions, insertUserFuncs };
