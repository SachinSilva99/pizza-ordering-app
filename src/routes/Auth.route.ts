import {Router} from "express";
import {login, userSignUp} from "../controller/Auth.controller";


const router = Router();
router.post("/signup", userSignUp);
// router.post("/login/google", loginWithGoogle);
// router.post("/signup/google", signUpWithGoogle);
router.post("/login", login);
export default router;
