import express from "express";
import {
  deleteUser,
  updateUser,
  getUsers,
  getUser,
  changePassword,
} from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

const router = express.Router();

router.put("/update/:userId", verifyToken, updateUser);
router.put("/change-password", verifyToken, changePassword);
router.delete("/delete/:userId", verifyToken, deleteUser);
router.get("/get_users", verifyToken, getUsers);
router.get("/:userId", getUser);

// router.post("/seed", async (req, res, next) => {
//   const generateUsers = () => {
//     const users = [];

//     for (let i = 1; i <= 30; i++) {
//       users.push({
//         username: `user${i}`,
//         email: `user${i}@example.com`,
//         password: bcrypt.hashSync("123456", 10),
//         profilePicture: `https://i.pravatar.cc/150?img=${i}`,
//         role: "user",
//         isVerified: true,
//       });
//     }

//     return users;
//   };

//   try {
//     await User.insertMany(generateUsers());
//     res.status(200).json({ message: "users added" });
//   } catch (error) {
//     next(error);
//   }
// });

export default router;
