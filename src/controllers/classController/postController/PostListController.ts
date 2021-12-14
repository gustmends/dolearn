import { NextFunction, Request, Response } from "express";
import { postService } from "../../../services";

class PostListController {
    async handle(request: Request, response: Response, next: NextFunction) {
        const { title, description, page } = request.query as {[key: string]: string};
        const fileList = await postService.postList({
            title: { contains: title },
            description: { contains: description }
        },
        { page, per_page: 20 });

        return response.json(fileList);
    }
}

export { PostListController };