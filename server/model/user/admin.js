// createTeam creates a team in the team table
const createTeam = async (team) => {
  try {
    const stmt = "INSERT INTO team SET ?";
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

// setUserAccess stores the access level of the user in the access table
const setUserAccess = async (userAccess) => {
  try {
    const stmt = "INSERT INTO access SET ?";
    const access = {
      team_id: userAccess.teamID,
      user_id: userAccess.userID,
      access_level: userAccess.accessLevel,
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
    let stmt = "INSERT INTO func (func_name) VALUES ";
    for (let f in functions) {
      stmt += "(?),";
    }
    stmt = stmt.slice(0, -1); // Remove trailing ,

    await db.Query(stmt, functions);
  } catch (err) {
    return err;
  }
};

// setUserFuncs stores the functions of a user in the user_func table
const setUserFuncs = async (userFuncs) => {
  if (userFuncs.functions.length === 0) {
    return;
  }

  try {
    let stmt = "INSERT INTO user_func (user_id, func_id) VALUES ";
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

export { createTeam, setUserAccess, createFunctions, setUserFuncs };
