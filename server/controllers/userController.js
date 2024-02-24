import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createToken = (id) => {
  return jwt.sign({ id }, "secret", { expiresIn: "1d" });
};

export const createUser = async (req, res) => {
  const { userId, userName, password, confirmPassword, email } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashPass = await bcrypt.hash(password, salt);
  try {
    const userData = {
      userId,
      userName,
      password: hashPass,
      confirmPassword,
      email,
    };
    await userModel.createUser(userData, (err, result) => {
      if (err) {
        res.status(400).json("Cannot create user");
        console.log(err);
      } else {
        res.status(200).json(result);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params; // Get user ID from request parameters
  const { userName, email } = req.body; // Get updated user data from request body
  const userIdFromToken = req.userId; // Get user ID from decoded JWT token

  // Check if the user ID from the token matches the ID of the user whose data is being updated
  if (parseInt(id) !== parseInt(userIdFromToken)) {
    return res.status(401).json({ error: "Unauthorized: You are not allowed to update this user" });
  }

  try {
    // Update user data in the database
    await userModel.updateUser(id, { userName, email });

    // Optionally, you can fetch the updated user data and send it back in the response
    const updatedUser = await userModel.getUserById(id);

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};


export const Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    userModel.findOneByEmail(email, (error, user) => {
      if (error) {
        console.error(error);
        return res.status(500).json("Internal server error");
      }

      if (!user) {
        return res.status(401).json({ error: "User is not found" });
      }

      const isMatch = bcrypt.compareSync(password, user.password);

      if (isMatch) {
        const token = createToken(user.userId);
        const responseData = {
          message: "Login successful",
          user: {
            id: user.userId,
            name: user.userName,
            email: user.email,
            // Include any other relevant user details
          },
          token: token,
        };

        return res.status(200).json(responseData);
      } else {
        return res.status(401).json("Invalid email or password");
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json("Internal server error");
  }
};
