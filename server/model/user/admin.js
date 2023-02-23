import Db from "../conneciton.js";

// createTeam creates a team in the team table
const createTeam = async (team) => {
  try {
    const stmt = "INSERT INTO teams SET ?";
    const values = [
      {
        team_name: team.name,
      },
    ];
    const [result] = await Db.executeQuery(conn, stmt, values);

    // return team with auto generated team_id
    team.team_id = result.insertId;
    return team;
  } catch (err) {
    return err;
  }
};

// setUserPermission stores the access level of the user in the permission table
const setUserPermission = async (userPermission) => {
  const stmt = "INSERT INTO permissions SET ?";
  const values = [
    {
      team_id: userPermission.teamID,
      user_id: userPermission.userID,
      access_level: userPermission.accessLevel,
    },
  ];

  const conn = Db.pool.getConnection();
  await Db.executeQuery(conn, stmt, values);
};

// createFunctions stores the list of functions in the func table
const createFunctions = async (functions) => {
  const stmt = "INSERT INTO functions (func_name) VALUES (?)";
  const values = functions;

  const conn = await Db.pool.getConnection();
  await Db.executeQuery(conn, stmt, values);
};

// insertUserFuncs stores the functions of a user in the user_func table
const insertUserFuncs = async (userFuncs) => {
  const stmt = "INSERT INTO user_funcs (user_id, func_id) VALUES (? , ?);";
  const values = userFuncs.funcIDs.map((u) => [userFuncs.userID, u.funcID]);

  const conn = await Db.pool.getConnection();
  await Db.executeQuery(conn, stmt, values);
};

export { createTeam, setUserPermission, createFunctions, insertUserFuncs };
