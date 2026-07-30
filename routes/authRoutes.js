import express from "express"
import {registerUser,userLogin} from "../controllers/authController.js"
const router = express.Router();
//public routes

router.post("/register",registerUser);
router.post("/login",userLogin);
export default router;
