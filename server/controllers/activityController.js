import activityModel from "../models/activityModel.js";
//import bcrypt from "bcrypt";
//import jwt from "jsonwebtoken";

// const createToken = (id) => {
//   return jwt.sign({ id }, "secret", { expiresIn: "1d" });
// };

export const createActivity = async (req, res) => {
  const { activityId, message, comment, like } = req.body;
 
  try {
    const activityData = { activityId, message, comment, like };
    await activityModel.createActivity(activityData, (err, result) => {
      if (err) {
        res.status(400).json("Cannot create activity");
        console.log(err);
      } else {
        res.status(200).json(result);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

// export const Login = async (req, res) => {
//   const { like, comment } = req.body;

//   try {
//     // const user = await userModel.findOne(like);

//     // if (!user) {
//     //   return res.status(401).json("User is not found");
//     // }

//     userModel.findOne(like, (error, user) => {
//       if (error) {
//         console.error(error);
//         return res.status(500).json("Internal server error");
//       }

//       if (!user) {
//         return res.status(401).json({error:"User is not found"});
//       }

//       const isMatch = bcrypt.compareSync(comment, user.comment);

//       if (isMatch) {
//         const token = createToken(user.id);
//         const responseData = {
//           message: "Login successful",
//           user: {
//             id: user.id,
//             name: user.message,
//             like: user.like,
//             // Include any other relevant user details
//           },
//           token: token,
//         };

//         return res.status(200).json(responseData);
//       } else {
//         return res.status(401).json("Invalid like or comment");
//       }
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json("Internal server error");
//   }
// };
