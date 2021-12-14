import { NextFunction, Request, Response } from "express";
import { WebDefault } from "../../../model/WebError";
import { videoService } from "../../../services";

class VideoUpdateController {
    async handle(request: Request, response: Response, next: NextFunction) {
        const { name, link, description } = request.body;
        const { user,userClass, userVideo } = request;

        if(userClass.user_id != user.id) {
            return next(new WebDefault("video_permission_denied"));
        } if(name && name.length < 3) {
            return next(new WebDefault("video_invalid_name"));
        } if(link && link.length < 5) {
            return next(new WebDefault("video_invalid_link"));
        } if(description && description.length < 8) {
            return next(new WebDefault("video_invalid_description"));
        }

        const newVideo = await videoService.videoPatch(userVideo, { name,link,description,class_id: userClass.id });
        return response.json(newVideo);
    }
}

export { VideoUpdateController };