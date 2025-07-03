import express from "express";
import {
  getAllUsers,
  createUser,
  userLogin,
  deleteUser,
} from "../controllers/userControllers.js";

const router = express.Router();

router.get("/", getAllUsers);
router.post("/signup", createUser);
router.post("/login", userLogin);
router.delete("/:userId", deleteUser);

export default router;
