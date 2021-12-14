import { NextFunction, Request, Response } from "express";
import { WebDefault } from "../model/WebError";
import { jwtService, userService } from "../services";
import { errorHandler } from "./errorHandling";

async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    var payload, user;
    const { authorization } = request.headers;
    if(!authorization){
        return errorHandler(new WebDefault("user_not_authenticated"), request, response, next);
    }

    const [prefix, token] = authorization.split(" ");

    if(prefix.toLowerCase() != "bearer") {
        return errorHandler(new WebDefault("user_not_authenticated"), request, response, next);
    } else if(!(payload = jwtService.validate(token))) {
        return errorHandler(new WebDefault("user_not_authenticated"), request, response, next);
    } else if(!(user = await userService.userFind({ id: payload.id }))) {
        return errorHandler(new WebDefault("user_not_authenticated"), request, response, next);
    }

    request.user = user;
    return next();
}

export { ensureAuthenticated };