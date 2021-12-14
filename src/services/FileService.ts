import { Prisma, File } from ".prisma/client";
import { prismaClient } from "../prisma";
import { List } from "../model/ItemList";

class FileService {
    public select: Prisma.FileSelect
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

    async fileDelete(filter: Prisma.FileWhereUniqueInput){
        await prismaClient.file.delete({
            where: filter,
        });
    }

    async fileList(filter: Prisma.FileWhereInput, {page, per_page}, select: Prisma.FileSelect = {}) : Promise<List<File>> {
        page = Math.max(page || 0, 0);
        per_page = Math.max(per_page || 0, 0);

        const total = await prismaClient.file.count({ where: filter });
        const Filees = await prismaClient.file.findMany({
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
        }) as File[];

        return {
            data: Filees,
            count: Filees.length,
            page,
            per_page,
            total_page: Math.ceil(total/per_page),
            total
        }
    }

    async fileCreate({name,link,description, class_id}, select: Prisma.FileSelect = {}): Promise<File> {
        return await prismaClient.file.create({
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
        }) as File;
    }

    async fileFindAll(filter: Prisma.FileWhereInput, select: Prisma.FileSelect = {}, list?: {take?: number,skip?: number}): Promise<File[]>{
        return await prismaClient.file.findMany({
            select: {
                ...this.select,
                ...select
            },
            where: filter,
            orderBy: {
                name: "asc"
            },
            ...list,
        }) as File[];
    }

    async fileFind(filter: Prisma.FileWhereInput, select: Prisma.FileSelect = {}): Promise<File> {
        return await prismaClient.file.findFirst({
            select: {
                ...this.select,
                ...select
            },
            where: filter
        }) as File;
    }

    async filePatch(userFile: File, {name,link,description, class_id}, select: Prisma.FileSelect = {}): Promise<File> {
        return await prismaClient.file.update({
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
                id: userFile.id
            }
        }) as File;
    }
}

export { FileService };