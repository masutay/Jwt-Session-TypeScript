import * as express from "express";
import { register_user, login_user, logout} from "../controllers/authController";
import { registerValidator, checkRegister, loginValidator, checkLogin } from "../middleware/validationMiddleware";

//all post request 
const router = express.Router();

router.post("/register",registerValidator,checkRegister, register_user);

router.post("/login",loginValidator, checkLogin,login_user,);  

router.post("/logout", logout);

const authRouter = router;
export default authRouter;


