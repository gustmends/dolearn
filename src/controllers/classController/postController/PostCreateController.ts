import { NextFunction, Request, Response } from "express";
import { WebDefault } from "../../../model/WebError";
import { postService } from "../../../services";

class PostCreateController {
    async handle(request: Request, response: Response, next: NextFunction) {
        const { title, description } = request.body;
        const { userClass, user } = request;

        if(userClass.user_id != user.id){
            return next(new WebDefault("post_permission_denied"));
        } else if(!title || title.length < 3){
            return next(new WebDefault("post_invalid_title"));   
        } else if(!description || description.length < 8) {
            return next(new WebDefault("post_invalid_description"));   
        }

        const file = await postService.postCreate({title, description, class_id: userClass.id});
        return response.json(file);
    }
}

export { PostCreateController };