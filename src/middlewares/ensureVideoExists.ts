import { NextFunction, Request, Response } from "express";
import { WebDefault } from "../model/WebError";
import { videoService } from "../services";
import { errorHandler } from "./errorHandling";

async function ensureVideoExists(request: Request, response: Response, next: NextFunction) {
    const { video_id } = request.params;
    const { userClass } = request;
    var userVideo;

    if(!video_id){
        return errorHandler(new WebDefault("video_not_found"), request, response, next);
    } else if(!(userVideo = await videoService.videoFind({ id: video_id, class_id: userClass.id }))) {
        return errorHandler(new WebDefault("video_not_found"), request, response, next);
    }
    
    request.userVideo = userVideo;
    return next();
}

export { ensureVideoExists };