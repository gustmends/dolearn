import { UserCreateController } from "./UserCreateController";
import { UserLoginController } from "./UserLoginController";
import { UserUpdateController } from "./UserUpdateController";
import { UserListClassController } from "./UserListClassController";

const userCreateController = new UserCreateController();
const userLoginController = new UserLoginController();
const userUpdateController = new UserUpdateController();
const userListClassController = new UserListClassController();

export {
    userCreateController,
    userLoginController,
    userUpdateController,
    userListClassController
};