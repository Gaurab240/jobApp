import mysql from "mysql";

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  comment: "",
  database: "jobApp",
});

const activityModel = {
  createActivityTable: () => {
    const query = `
    CREATE TABLE IF NOT EXISTS activity (
    activityId INT AUTO_INCREMENT PRIMARY KEY,
    message VARCHAR(255) NOT NULL,
    comment VARCHAR(255) NOT NULL,
    likeCount INT DEFAULT 0
      )
    `;
    db.query(query, (error, results) => {
      if (error) throw error;
      console.log("activity table created successfully");
    });
  },

  createActivity: (userData, callback) => {
    const { activityId, message, comment, likeCount } = userData;
    const query =
      "INSERT INTO activity ( activityId, message, comment,likeCount) VALUES ( ?, ?,?, ?)";
   
    db.query(
      query,
      [activityId, message, comment, likeCount],
      (error, results) => {
        if (error) {
          callback(error);
        } else {
          callback(null, results);
        }
      }
    );
  },
};

export default activityModel;
