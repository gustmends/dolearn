import { NextFunction, Request, Response } from "express";
import { fileService } from "../../../services";

class FileListController {
    async handle(request: Request, response: Response, next: NextFunction) {
        const { name, description, page } = request.query as {[key: string]: string};
        const fileList = await fileService.fileList({
            name: { contains: name },
            description: { contains: description }
        },
        { page, per_page: 20 });

        return response.json(fileList);
    }
}

export { FileListController };