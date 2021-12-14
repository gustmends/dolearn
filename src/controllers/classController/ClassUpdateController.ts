import { NextFunction, Request, Response } from "express";
import { WebDefault } from "../../model/WebError";
import { classService } from "../../services";

class ClassUpdateController {
    async handle(request: Request, response: Response, next: NextFunction) {
        const { name,discipline,matter } = request.body;
        const { userClass, user } = request;
        
        if(userClass.user_id != user.id) {
            return next(new WebDefault("class_permission_denied"));
        } if(name && name.length < 8) {
            return next(new WebDefault("class_invalid_name"));
        } if(discipline && discipline.length < 5) {
            return next(new WebDefault("class_invalid_discipline"));
        } if(matter && matter.length < 3) {
            return next(new WebDefault("class_invalid_matter"));
        }

        const newClass = await classService.classPatch(userClass, { name,discipline,matter });
        return response.json(newClass);
    }
}

export { ClassUpdateController };