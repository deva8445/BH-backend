import express from "express";
import { UserController } from "../controllers/user/user.controller";
import { validateRequest } from "../middlewares/validationMiddleware";
import { CreateUserDto, LoginInDto } from "../controllers/user/user.dto";

const router = express.Router();

router.post("/signup", validateRequest(CreateUserDto), UserController.signUp);

router.post("/login", validateRequest(LoginInDto), UserController.logIn);

export default router;
