import { NextFunction, Request, Response } from "express";
import { WebDefault } from "../../../model/WebError";
import { postService } from "../../../services";

class PostUpdateController {
    async handle(request: Request, response: Response, next: NextFunction) {
        const { title, description } = request.body;
        const { user,userClass, userPost } = request;

        if(userClass.user_id != user.id) {
            return next(new WebDefault("post_permission_denied"));
        } if(title && title.length < 3) {
            return next(new WebDefault("post_invalid_title"));
        } if(description && description.length < 8) {
            return next(new WebDefault("post_invalid_description"));
        }

        const newFile = await postService.postPatch(userPost, { title,description,class_id: userClass.id });
        return response.json(newFile);
    }
}

export { PostUpdateController };