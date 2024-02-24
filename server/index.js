import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mysql from "mysql";
import userRoutes from "./routes/userRoutes.js";
import activityRoutes from "./routes/activityRoutes.js";
import userModel from './models/userModel.js';
import activityModel from './models/activityModel.js';

const app=express();
app.use(cors());
app.use(express.json());
dotenv.config();

const PORT=5002;
const pool=mysql.createPool({
    host:"localhost",
    user:"root",
    password:"",
    database:"jobApp"
})

pool.getConnection((err,connection)=>{
    if (err) {
        console.error("Error getting MySQL connection:", err);
      } else {
        console.log("Connected to MySQL database");
        connection.release();
        userModel.createUserTable();
        activityModel.createActivityTable();
      }    
})

pool.on("error", (err) => {
    console.error("MySQL pool error:", err);
  });

  app.use((req, res, next) => {
    req.pool = pool; // Attach the connection pool to the request object
    next();
  });
  
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  app.use("/api/user", userRoutes);
 
  app.use("/api/acti", activityRoutes);
  