import mysql from "mysql";

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  comment: "",
  database: "jobApp",
});

const activityModel = {
  createActivityTable: () => {
    // const query = `
    // CREATE TABLE IF NOT EXISTS activity (
    // activityId INT AUTO_INCREMENT PRIMARY KEY,
    // userId INT,
    // message VARCHAR(255) NOT NULL,
    // comment VARCHAR(255) NOT NULL,
    // likeCount INT DEFAULT 0
    //   )
    // `;
    const alterTableQuery = `
    ALTER TABLE activity
    ADD COLUMN userId INT,
    ADD CONSTRAINT fk_user FOREIGN KEY (userId) REFERENCES users(userId) ON DELETE CASCADE ON UPDATE CASCADE
  `;
   

    // db.query(query, (error, results) => {
    //   if (error) throw error;
    //   console.log("activity table created successfully");
     
    
    // });

    //For altering table
    // db.query(alterTableQuery, (error, results) => {
    //   if (error) throw error;
    //   console.log("Foreign key constraint added successfully");
    // });

    db.query(alterTableQuery, (error, results) => {
      if (error && error.code !== 'ER_DUP_FIELDNAME') {
        // If the error is not due to a duplicate column name, throw it
        throw error;
      } else if (!error) {
        // If no error occurred, the foreign key constraint was added successfully
        console.log("Foreign key constraint added successfully");
      }
    });
  
  },

  

  createActivity: (userData, callback) => {
    const { activityId, message, comment, likeCount, userId } = userData;
    const query =
      "INSERT INTO activity ( activityId, message, comment,likeCount,userId) VALUES ( ?, ?,?,?,?)";
   
    db.query(
      query,
      [activityId, message, comment, likeCount,userId],
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
