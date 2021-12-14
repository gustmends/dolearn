import { NextFunction, Request, Response } from "express";
import { WebDefault } from "../../../model/WebError";
import { videoService } from "../../../services";

class VideoDeleteController {
    async handle(request: Request, response: Response, next: NextFunction) {
        const { userVideo, userClass, user } = request;

        if(user.id != userClass.user_id){
            return next(new WebDefault("video_permission_denied"))
        }

        await videoService.videoDelete({ id: userVideo.id });
        return response.status(201).end();
    }
}

export { VideoDeleteController };