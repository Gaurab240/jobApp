import activityModel from "../models/activityModel.js";
//import bcrypt from "bcrypt";
//import jwt from "jsonwebtoken";

// const createToken = (id) => {
//   return jwt.sign({ id }, "secret", { expiresIn: "1d" });
// };

export const createActivity = async (req, res) => {
  const { activityId, message, comment, like } = req.body;
  const userId = req.userId;
  try {
    const activityData = { activityId, message, comment, like, userId };
    await activityModel.createActivity(activityData, (err, result) => {
      if (err) {
        res.status(400).json({ error: "Failed to create activity", details: err.message });
        console.log(err);
      } else {
        res.status(200).json(result);
      }
    });
  } catch (error) {
    console.log(error);
  }
};
