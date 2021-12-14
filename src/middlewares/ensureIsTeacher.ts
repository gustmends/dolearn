import { NextFunction, Request, Response } from "express";
import { WebDefault } from "../model/WebError";
import { errorHandler } from "./errorHandling";

async function ensureIsTeacher(request: Request, response: Response, next: NextFunction) {
    const { user } = request;
    if(!user.is_teacher){
        return errorHandler(new WebDefault("user_not_teacher"), request, response, next);
    }

    return next();
}

export { ensureIsTeacher };