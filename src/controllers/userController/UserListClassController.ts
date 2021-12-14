import { NextFunction, Request, Response } from "express";
import { WebDefault } from "../../model/WebError";
import { classService, userService } from "../../services";

class UserListClassController {
    async handle(request: Request, response: Response, next: NextFunction) {
        const { user } = request;
        const { page } = request.query;
        const skip = parseInt(page as string) | 0;
        
        if(!user.is_teacher){
            return next(new WebDefault("user_not_teacher"));
        }

        const classList = await classService.classList(
            { user_id: user.id }, 
            { page: skip, per_page: 20 },
            { user: false, user_id: true }
        );

        return response.json(classList);
    }
}

export { UserListClassController };