import { NextFunction, Request, Response } from "express";
import { classService } from "../../services";

class ClassListController {
    async handle(request: Request, response: Response, next: NextFunction) {
        const { name, discipline, matter, page } = request.query as {[key: string]: string};
        const classList = await classService.classList({
            name: { contains: name },
            discipline: { contains: discipline },
            matter: { contains: matter },
        },
        { page, per_page: 20 });

        return response.json(classList);
    }
}

export { ClassListController };