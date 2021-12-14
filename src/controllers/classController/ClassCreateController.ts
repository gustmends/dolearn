import { NextFunction, Request, Response } from "express";
import { WebDefault } from "../../model/WebError";
import { classService } from "../../services";

class ClassCreateController {
    async handle(request: Request, response: Response, next: NextFunction) {
        const { name,discipline,matter } = request.body;
        const { user } = request;

        if(!name || name.length < 8) {
            return next(new WebDefault("class_invalid_name"));

        } if(!discipline || discipline.length < 5) {
            return next(new WebDefault("class_invalid_discipline"));

        } if(!matter || matter.length < 3) {
            return next(new WebDefault("class_invalid_matter"));

        }

        const userClass = await classService.classCreate({
            name,
            discipline,
            matter
        }, user.id);

        return response.status(201).json(userClass);
    }
}

export { ClassCreateController };