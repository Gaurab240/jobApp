import mysql from "mysql";

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "jobApp",
});

const userModel = {
  createUserTable: () => {
    const query = `
    CREATE TABLE IF NOT EXISTS users (
    userId INT AUTO_INCREMENT PRIMARY KEY,
    userName VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    confirmPassword VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL
      )
    `;
    db.query(query, (error, results) => {
      if (error) throw error;
      console.log("Users table created successfully");
    });
  },

  createUser: (userData, callback) => {
    const { userId, userName, password, confirmPassword, email } = userData;
    const query =
      "INSERT INTO users ( userId, userName, password,confirmPassword, email) VALUES (?, ?, ?, ?, ?)";
    // db.query(query, [ userId, userName, password, email ], callback);
    db.query(
      query,
      [userId, userName, password, confirmPassword, email],
      (error, results) => {
        if (error) {
          callback(error);
        } else {
          callback(null, results);
        }
      }
    );
  },

  findOneByEmail: (email, callback) => {
    const query = "SELECT * FROM users WHERE email = ?";
    db.query(query, [email], (error, results) => {
      if (error) {
        callback(error);
      } else {
        callback(null, results[0]); // Assuming there's only one user with the given email
      }
    });
  },

  // updateUser: (userId, userData, callback) => {
  //   const { userName, email } = userData;
  //   const query = "UPDATE users SET userName = ?, email = ? WHERE userId = ?";
  //   db.query(query, [userName, email, userId], (error, results) => {
  //     if (error) {
  //       callback(error);
  //     } else {
  //       callback(null, results);
  //     }
  //   });
  // },
  updateUser: (userId, userData) => {
    const { userName, email } = userData;
    const query = "UPDATE users SET userName = ?, email = ? WHERE userId = ?";
    return new Promise((resolve, reject) => {
      db.query(query, [userName, email, userId], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  },

  getUserById: (userId) => {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM users WHERE userId = ?";
      db.query(query, [userId], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results[0]); // Assuming there's only one user with the given ID
        }
      });
    });
  }


};

export default userModel;
