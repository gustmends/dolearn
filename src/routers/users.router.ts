import "express-async-error";
import { Router } from "express";
import { errorHandler } from "../middlewares/errorHandling";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { 
    userCreateController,
    userLoginController,
    userUpdateController,
    userListClassController
} from "../controllers/userController";

const userRouter = Router();

userRouter.get("/classes", ensureAuthenticated, userListClassController.handle);
userRouter.post("/", userCreateController.handle);
userRouter.post("/login", userLoginController.handle);
userRouter.patch("/", ensureAuthenticated, userUpdateController.handle);

userRouter.use(errorHandler);

export { userRouter };