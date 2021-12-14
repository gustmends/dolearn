import { validate } from "email-validator";
import { NextFunction, Request, Response } from "express";
import { WebDefault } from "../../model/WebError";
import { userService } from "../../services";

class UserUpdateController {
    async handle(request: Request, response: Response, next: NextFunction) {
        const { email,name } = request.body;
        const { user } = request;        
        
        if(email){
            if(!validate(email)){
                return next(new WebDefault("user_invalid_email"));
            } else if(email != user.email && await userService.userFind({ email })){
                return next(new WebDefault("user_already_registered"));
            } 
        }
        
        if(name && name.length < 3){
            return next(new WebDefault("user_invalid_name"));
        }

        const newUser = await userService.userPatch(user,
            { email, name },
            { 
                id: true,
                email: true,
                is_teacher: true,
                created_dt: true
            }
        );
        return response.json(newUser);
    }
}

export { UserUpdateController };