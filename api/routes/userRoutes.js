import express from "express";
import UsersController from "../controllers/userControllers.js";

const router = express.Router();

router.get("/", UsersController.getAllUsers);
router.post("/signup", UsersController.createUser);
router.post("/login", UsersController.loginUser);
router.delete("/:userId", UsersController.deleteUser);

export default router;
