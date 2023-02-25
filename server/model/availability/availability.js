import Db from "../conneciton.js";

const insertUserAvailabilities = async (userAvailabilities) => {
  const { userID, serviceDateIDs } = userAvailabilities;

  const stmt = "INSERT INTO availabilities (user_id, service_date_id) VALUES ?";

  const values = serviceDateIDs.map((serviceDateID) => [userID, serviceDateID]);

  await Db.executeQuery(stmt, [values]);
};

const insertUserMonthlyMax = async (userMonthlyMax) => {
  const stmt = "INSERT INTO monthly_max_times SET ?";
  const values = {
    user_id: userMonthlyMax.userID,
    year: userMonthlyMax.year,
    month: userMonthlyMax.month,
    monthly_max: userMonthlyMax.monthlyMax,
  };

  await Db.executeQuery(stmt, [values]);
};

export { insertUserAvailabilities, insertUserMonthlyMax };
