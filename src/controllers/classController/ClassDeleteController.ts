import { NextFunction, Request, Response } from "express";
import { WebDefault } from "../../model/WebError";
import { classService } from "../../services";

class ClassDeleteController {
    async handle(request: Request, response: Response, next: NextFunction) {
        const { userClass, user } = request;

        if(userClass.user_id != user.id) {
            return next(new WebDefault("class_permission_denied"));
        } 
        await classService.classDelete({
            id: userClass.id
        });
        
        return response.status(201).end();
    }
}

export { ClassDeleteController };