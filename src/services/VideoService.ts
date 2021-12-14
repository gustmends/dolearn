import { Prisma, Video } from ".prisma/client";
import { prismaClient } from "../prisma";
import { List } from "../model/ItemList";

class VideoService {
    public select: Prisma.VideoSelect
    constructor(){
        this.select = {
            id: true,
            name: true,
            link: true,
            description: true,
            class_id: true,
            created_dt: true,
            class: false
        };
    }

    async videoDelete(filter: Prisma.VideoWhereUniqueInput){
        await prismaClient.video.delete({
            where: filter,
        });
    }

    async videoList(filter: Prisma.VideoWhereInput, {page, per_page}, select: Prisma.VideoSelect = {}) : Promise<List<Video>> {
        page = Math.max(page || 0, 0);
        per_page = Math.max(per_page || 0, 0);

        const total = await prismaClient.video.count({ where: filter });
        const Videoes = await prismaClient.video.findMany({
            select: {
                ...this.select,
                ...select
            },
            where: filter,
            orderBy: {
                name: "asc"
            },
            take: per_page,
            skip: page * per_page
        }) as Video[];

        return {
            data: Videoes,
            count: Videoes.length,
            page,
            per_page,
            total_page: Math.ceil(total/per_page),
            total
        }
    }

    async videoCreate({name,link,description, class_id}, select: Prisma.VideoSelect = {}): Promise<Video> {
        return await prismaClient.video.create({
            data:{
                name,
                link,
                description,
                class_id
            },
            select: {
                ...this.select,
                ...select
            }
        }) as Video;
    }

    async videoFindAll(filter: Prisma.VideoWhereInput, select: Prisma.VideoSelect = {}, list?: {take?: number,skip?: number}): Promise<Video[]>{
        return await prismaClient.video.findMany({
            select: {
                ...this.select,
                ...select
            },
            where: filter,
            orderBy: {
                name: "asc"
            },
            ...list,
        }) as Video[];
    }

    async videoFind(filter: Prisma.VideoWhereInput, select: Prisma.VideoSelect = {}): Promise<Video> {
        return await prismaClient.video.findFirst({
            select: {
                ...this.select,
                ...select
            },
            where: filter
        }) as Video;
    }

    async videoPatch(userVideo: Video, {name,link,description, class_id}, select: Prisma.VideoSelect = {}): Promise<Video> {
        return await prismaClient.video.update({
            data: {
                name,
                link,
                description,
                class_id
            },
            select: {
                ...this.select,
                ...select
            },
            where: {
                id: userVideo.id
            }
        }) as Video;
    }
}

export { VideoService };