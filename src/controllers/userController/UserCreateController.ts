import { NextFunction, Request, Response } from "express";
import { hash } from "bcryptjs";
import { WebDefault } from "../../model/WebError";
import { validate } from "email-validator";
import { userService } from "../../services/";

class UserCreateController {
    async handle(request: Request, response: Response, next: NextFunction) {
        const { name,email,password,is_teacher } = request.body;
        
        if(!email || !validate(email)) {
            return next(new WebDefault("user_invalid_email"));

        } else if(await userService.userFind({ email })) {
            return next(new WebDefault("user_already_registered"));

        } else if(!name || name.length < 3) {
            return next(new WebDefault("user_invalid_name"));

        } else if(!password || password.length < 8) {
            return next(new WebDefault("user_invalid_password"));
            
        }
        
        const user = await userService.userCreate({
            name,
            email,
            password: await hash(password, 8),
            is_teacher
        });

        return response.status(201).json(user);
        
    }
}

export { UserCreateController };