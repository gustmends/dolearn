import { Prisma, Post } from ".prisma/client";
import { prismaClient } from "../prisma";
import { List } from "../model/ItemList";

class PostService {
    public select: Prisma.PostSelect
    constructor(){
        this.select = {
            id: true,
            title: true,
            description: true,
            class_id: true,
            created_dt: true,
            class: false
        };
    }

    async postDelete(filter: Prisma.PostWhereUniqueInput){
        await prismaClient.post.delete({
            where: filter,
        });
    }

    async postList(filter: Prisma.PostWhereInput, {page, per_page}, select: Prisma.PostSelect = {}) : Promise<List<Post>> {
        page = Math.max(page || 0, 0);
        per_page = Math.max(per_page || 0, 0);

        const total = await prismaClient.post.count({ where: filter });
        const Postes = await prismaClient.post.findMany({
            select: {
                ...this.select,
                ...select
            },
            where: filter,
            orderBy: {
                title: "asc"
            },
            take: per_page,
            skip: page * per_page
        }) as Post[];

        return {
            data: Postes,
            count: Postes.length,
            page,
            per_page,
            total_page: Math.ceil(total/per_page),
            total
        }
    }

    async postCreate({title, description, class_id}, select: Prisma.PostSelect = {}): Promise<Post> {
        return await prismaClient.post.create({
            data:{
                title,
                description,
                class_id
            },
            select: {
                ...this.select,
                ...select
            }
        }) as Post;
    }

    async postFindAll(filter: Prisma.PostWhereInput, select: Prisma.PostSelect = {}, list?: {take?: number,skip?: number}): Promise<Post[]>{
        return await prismaClient.post.findMany({
            select: {
                ...this.select,
                ...select
            },
            where: filter,
            orderBy: {
                title: "asc"
            },
            ...list,
        }) as Post[];
    }

    async postFind(filter: Prisma.PostWhereInput, select: Prisma.PostSelect = {}): Promise<Post> {
        return await prismaClient.post.findFirst({
            select: {
                ...this.select,
                ...select
            },
            where: filter
        }) as Post;
    }

    async postPatch(userPost: Post, {title, description, class_id}, select: Prisma.PostSelect = {}): Promise<Post> {
        return await prismaClient.post.update({
            data: {
                title,
                description,
                class_id
            },
            select: {
                ...this.select,
                ...select
            },
            where: {
                id: userPost.id
            }
        }) as Post;
    }
}

export { PostService };