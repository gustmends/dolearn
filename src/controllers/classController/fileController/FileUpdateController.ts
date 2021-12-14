import { NextFunction, Request, Response } from "express";
import { WebDefault } from "../../../model/WebError";
import { fileService } from "../../../services";

class FileUpdateController {
    async handle(request: Request, response: Response, next: NextFunction) {
        const { name, link, description } = request.body;
        const { user,userClass, userFile } = request;
        
        if(userClass.user_id != user.id) {
            return next(new WebDefault("file_permission_denied"));
        } if(name && name.length < 3) {
            return next(new WebDefault("file_invalid_name"));
        } if(link && link.length < 5) {
            return next(new WebDefault("file_invalid_link"));
        } if(description && description.length < 8) {
            return next(new WebDefault("file_invalid_description"));
        }

        const newFile = await fileService.filePatch(userFile, { name,link,description,class_id: userClass.id });
        return response.json(newFile);
    }
}

export { FileUpdateController };