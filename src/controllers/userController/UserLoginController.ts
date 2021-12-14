import { User } from ".prisma/client";
import { compare } from "bcryptjs";
import { validate } from "email-validator";
import { NextFunction, Request, Response } from "express";
import { WebDefault } from "../../model/WebError";
import { jwtService, userService } from "../../services";

class UserLoginController {
    async handle(request: Request, response: Response, next: NextFunction) {
        var user: User;
        const { email, password } = request.body;
        
        if(!email || !validate(email)){
            return next(new WebDefault("user_not_found"));
        } else if(!(user = await userService.userFind({ email }, { password: true }))){
            return next(new WebDefault("user_not_found"));
        } else if(!password || !await compare(password, user.password)) {
            return next(new WebDefault("user_not_found"));
        }

        const token = jwtService.create({
            id: user.id,
            is_teacher: user.is_teacher
        });

        return response.json({ token });
    }
}

export { UserLoginController };