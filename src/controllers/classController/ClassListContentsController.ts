import { NextFunction, Request, Response } from "express";
import { classService } from "../../services";

class ClassListContentsController {
    async handle(request: Request, response: Response, next: NextFunction) {
        const { userClass } = request;
        
        const { videos, files, posts, _count } = await classService.classFind({
            id: userClass.id
        }, {
            _count: true,
            videos: {
                take: 10,
                select: {
                    id: true,
                    name: true,
                    link: true,
                    description: true,
                    class_id: true,
                    created_dt: true,
                    updated_dt: false
                }
            },
            files: {
                take: 10,
                select: {
                    id: true,
                    name: true,
                    link: true,
                    description: true,
                    class_id: true,
                    created_dt: true,
                    updated_dt: false
                }
            },
            posts: {
                take: 10,
                select: {
                    id: true,
                    title: true,
                    description: true,
                    class_id: true,
                    created_dt: true,
                    updated_dt: false
                }
            }
        }) as any;



        return response.json({
            video_info: {
                total: _count["videos"],
                lasts: videos
            },
            file_info: {
                total: _count["files"],
                lasts: files
            },
            post_info: {
                total: _count["posts"],
                lasts: posts
            },
        });
    }
}

export { ClassListContentsController };