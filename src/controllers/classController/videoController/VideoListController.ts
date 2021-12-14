import { NextFunction, Request, Response } from "express";
import { videoService } from "../../../services";

class VideoListController {
    async handle(request: Request, response: Response, next: NextFunction) {
        const { name, description, page } = request.query as {[key: string]: string};
        const fileList = await videoService.videoList({
            name: { contains: name },
            description: { contains: description }
        },
        { page, per_page: 20 });

        return response.json(fileList);
    }
}

export { VideoListController };