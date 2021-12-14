import { NextFunction, Request, Response } from "express";
import { WebDefault } from "../model/WebError";
import { fileService } from "../services";
import { errorHandler } from "./errorHandling";

async function ensureFileExists(request: Request, response: Response, next: NextFunction) {
    const { file_id } = request.params;
    const { userClass } = request;
    var userFile;

    if(!file_id){
        return errorHandler(new WebDefault("file_not_found"), request, response, next);
    } else if(!(userFile = await fileService.fileFind({ id: file_id, class_id: userClass.id }))) {
        return errorHandler(new WebDefault("file_not_found"), request, response, next);
    }
    
    request.userFile = userFile;
    return next();
}

export { ensureFileExists };