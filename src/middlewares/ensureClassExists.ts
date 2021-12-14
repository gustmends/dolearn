import { NextFunction, Request, Response } from "express";
import { WebDefault } from "../model/WebError";
import { classService } from "../services";
import { errorHandler } from "./errorHandling";

async function ensureClassExists(request: Request, response: Response, next: NextFunction) {
    const { class_id } = request.params;
    var userClass;

    if(!class_id){
        return errorHandler(new WebDefault("class_not_found"), request, response, next);
    } else if(!(userClass = await classService.classFind({ id: class_id }, { user_id: true }))){
        return errorHandler(new WebDefault("class_not_found"), request, response, next);
    }
    
    request.userClass = userClass;
    return next();
}

export { ensureClassExists };