import { NextFunction, Request, Response } from "express";
import { classService } from "../../services";

class ClassViewController {
    async handle(request: Request, response: Response, next: NextFunction) {
        const { userClass } = request;
        const {_count={}, ...currentClass} = {...await classService.classFind({
            id: userClass.id
        }, {
            _count: true
        })}

        Object.assign(currentClass, _count)
        return response.json(currentClass);
    }
}

export { ClassViewController };