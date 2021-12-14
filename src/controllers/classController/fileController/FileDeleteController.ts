import { NextFunction, Request, Response } from "express";
import { WebDefault } from "../../../model/WebError";
import { fileService } from "../../../services";

class FileDeleteController {
    async handle(request: Request, response: Response, next: NextFunction) {
        const { userFile, userClass, user } = request;

        if(user.id != userClass.user_id){
            return next(new WebDefault("file_permission_denied"))
        }

        await fileService.fileDelete({ id: userFile.id });
        return response.status(201).end();
    }
}

export { FileDeleteController };