import { NextFunction, Request, Response } from "express";

class PostViewController {
    async handle(request: Request, response: Response, next: NextFunction) {
        const { userPost } = request;
        return response.json(userPost);
    }
}

export { PostViewController };