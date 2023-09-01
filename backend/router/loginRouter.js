import { login }  from "../controllers/authController.js";
import  express  from "express";

const router=express.Router();
router.get('/login',login)
export default router;