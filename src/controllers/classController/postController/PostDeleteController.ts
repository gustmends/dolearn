import { NextFunction, Request, Response } from "express";
import { WebDefault } from "../../../model/WebError";
import { postService } from "../../../services";

class PostDeleteController {
    async handle(request: Request, response: Response, next: NextFunction) {
        const { userPost, userClass, user } = request;

        if(user.id != userClass.user_id){
            return next(new WebDefault("post_permission_denied"))
        }
        
        await postService.postDelete({ id: userPost.id });
        return response.status(201).end();
    }
}

export { PostDeleteController };