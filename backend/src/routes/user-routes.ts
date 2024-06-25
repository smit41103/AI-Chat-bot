import { Router } from "express";
import { getAllUsers, userSignup,userLogin } from "../controllers/user-controllers.js";
import { validate , signupValidator,LoginValidator } from "../utils/validators.js";
const userRoutes = Router();

userRoutes.get("/", getAllUsers);
userRoutes.post("/signup",validate(signupValidator) ,userSignup);
userRoutes.post('/login',validate(LoginValidator),userLogin);

export default userRoutes;
