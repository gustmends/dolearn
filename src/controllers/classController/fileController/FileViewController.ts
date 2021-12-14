import { NextFunction, Request, Response } from "express";

class FileViewController {
    async handle(request: Request, response: Response, next: NextFunction) {
        const { userFile } = request;
        return response.json(userFile);
    }
}

export { FileViewController };