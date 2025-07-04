import express from "express";
import { deleteUser, updateUser, getUsers, getUser, changePassword } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();



router.put("/update/:userId", verifyToken, updateUser);
router.put("/change-password", verifyToken, changePassword);
router.delete("/delete/:userId", verifyToken, deleteUser);
router.get("/get_users", verifyToken, getUsers);
router.get("/:userId", getUser);

export default router;       