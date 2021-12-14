import { NextFunction, Request, Response } from "express";
import { WebDefault } from "../../../model/WebError";
import { fileService } from "../../../services";

class FileCreateController {
    async handle(request: Request, response: Response, next: NextFunction) {
        const { name, link, description } = request.body;
        const { userClass, user } = request;
        
        if(userClass.user_id != user.id){
            return next(new WebDefault("file_permission_denied"));
        } else if(!name || name.length < 3){
            return next(new WebDefault("file_invalid_name"));   
        } else if(!link || link.length < 5) {
            return next(new WebDefault("file_invalid_link"));   
        } else if(!description || link.length < 8) {
            return next(new WebDefault("file_invalid_description"));   
        }
        
        const file = await fileService.fileCreate({name, link, description, class_id: userClass.id});
        return response.json(file);
    }
}

export { FileCreateController };