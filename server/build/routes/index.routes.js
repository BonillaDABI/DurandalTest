import { Router } from "express";
import {
    createUser,
    getUsers,
    updateUser,
    login
} from "../controllers/users.controller.js";

const router = Router();

router.post("/register", createUser);

router.get("/listAll", getUsers)

router.post("/login", login);

router.patch("/update", updateUser);

export default router;