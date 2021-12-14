import { NextFunction, Request, Response } from "express";

class VideoViewController {
    async handle(request: Request, response: Response, next: NextFunction) {
        const { userVideo } = request;
        return response.json(userVideo);
    }
}

export { VideoViewController };