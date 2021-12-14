import { Prisma, Class } from ".prisma/client";
import { prismaClient } from "../prisma";
import { userService } from ".";
import { List } from "../model/ItemList";

class ClassService {
    public select: Prisma.ClassSelect
    constructor(){
        this.select = {
            id: true,
            name: true,
            discipline: true,
            matter: true,
            user: {
                select: userService.select
            },
            created_dt: true
        };
    }

    async classDelete(filter: Prisma.ClassWhereUniqueInput){
        await prismaClient.class.delete({
            where: filter,
        });
    }

    async classList(filter: Prisma.ClassWhereInput, {page, per_page}, select: Prisma.ClassSelect = {}) : Promise<List<Class>> {
        page = Math.max(page || 0, 0);
        per_page = Math.max(per_page || 0, 0);

        const total = await prismaClient.class.count({ where: filter });
        const classes = await prismaClient.class.findMany({
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
        }) as Class[];

        return {
            data: classes,
            count: classes.length,
            page,
            per_page,
            total_page: Math.ceil(total/per_page),
            total
        }
    }

    async classCreate({name,discipline,matter}, user_id: string, select: Prisma.ClassSelect = {}): Promise<Class> {
        return await prismaClient.class.create({
            select: {
                ...this.select,
                ...select
            },
            data: {
                user_id,
                name,
                discipline,
                matter,
            },
        }) as Class;
    }

    async classFindAll(filter: Prisma.ClassWhereInput, select: Prisma.ClassSelect = {}, list?: {take?: number,skip?: number}): Promise<Class[]>{
        return await prismaClient.class.findMany({
            select: {
                ...this.select,
                ...select
            },
            where: filter,
            orderBy: {
                name: "asc"
            },
            ...list
        }) as Class[];
    }

    async classFind(filter: Prisma.ClassWhereInput, select: Prisma.ClassSelect = {}): Promise<Class> {
        return await prismaClient.class.findFirst({
            select: {
                ...this.select,
                ...select
            },
            where: filter
        }) as Class;
    }

    async classPatch(userClass: Class, {name,discipline,matter}, select: Prisma.ClassSelect = {}): Promise<Class> {
        return await prismaClient.class.update({
            select: {
                ...this.select,
                ...select
            },
            data: {
                name,
                discipline,
                matter
            },
            where: {
                id: userClass.id
            }
        }) as Class;
    }
}

export { ClassService };