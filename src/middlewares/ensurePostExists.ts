import { NextFunction, Request, Response } from "express";
import { WebDefault } from "../model/WebError";
import { postService } from "../services";
import { errorHandler } from "./errorHandling";

async function ensurePostExists(request: Request, response: Response, next: NextFunction) {
    const { post_id } = request.params;
    const { userClass } = request;
    var userPost;

    if(!post_id){
        return errorHandler(new WebDefault("post_not_found"), request, response, next);
    } else if(!(userPost = await postService.postFind({ id: post_id, class_id: userClass.id }))) {
        return errorHandler(new WebDefault("post_not_found"), request, response, next);
    }
    
    request.userPost = userPost;
    return next();
}

export { ensurePostExists };