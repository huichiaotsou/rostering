// createTeam creates a team in the team table
const createTeam = async (team) => {
  try {
    const stmt = "INSERT INTO teams SET ?";
    const team = {
      team_name: team.name,
    };
    const result = await db.Query(stmt, team);

    // return team with auto generated team_id
    team.team_id = result.insertId;
    return team;
  } catch (err) {
    return err;
  }
};

// setUserPermission stores the access level of the user in the permission table
const setUserPermission = async (userPermission) => {
  try {
    const stmt = "INSERT INTO permissions SET ?";
    const access = {
      team_id: userPermission.teamID,
      user_id: userPermission.userID,
      access_level: userPermission.accessLevel,
    };

    await db.Query(stmt, access);
  } catch (err) {
    return err;
  }
};

// createFunctions stores the list of functions in the func table
const createFunctions = async (functions) => {
  if (functions.length === 0) {
    return;
  }
  try {
    let stmt = "INSERT INTO functions (func_name) VALUES ";
    for (let f in functions) {
      stmt += "(?),";
    }
    stmt = stmt.slice(0, -1); // Remove trailing ,

    await db.Query(stmt, functions);
  } catch (err) {
    return err;
  }
};

// insertUserFuncs stores the functions of a user in the user_func table
const insertUserFuncs = async (userFuncs) => {
  if (userFuncs.functions.length === 0) {
    return;
  }

  try {
    let stmt = "INSERT INTO user_funcs (user_id, func_id) VALUES ";
    const params = [];
    for (let func of userFuncs.functions) {
      stmt += `( ? , ? ),`;
      params.push(userFuncs.userID, func);
    }
    stmt = stmt.slice(0, -1); // Remove trailing ,

    await db.Query(stmt, params);
  } catch (err) {
    return err;
  }
};

export { createTeam, setUserPermission, createFunctions, insertUserFuncs };
