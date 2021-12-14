import { Prisma, User } from ".prisma/client";
import { prismaClient } from "../prisma";

class UserService {
    public readonly select: Prisma.UserSelect
    constructor(){
        this.select = {
            id: true,
            name: true,
            email: true,
            password: false,
            is_teacher: true,
            created_dt: true
        } as Prisma.UserSelect;
    }
    async userCreate({name, email, password, is_teacher}, select: Prisma.UserSelect = {}): Promise<User> {
        return await prismaClient.user.create({
            select: {
                ...this.select,
                ...select
            },
            data:{
                name,
                email,
                password,
                is_teacher
            }
        }) as User;
    }

    async userFind(input: Prisma.UserWhereInput, select: Prisma.UserSelect = {}): Promise<User> {
        return await prismaClient.user.findFirst({
            select: {
                ...this.select,
                ...select
            },
            where: input
        }) as User;
    }

    async userPatch(user: User, {name, email}, select: Prisma.UserSelect = {}): Promise<User> {
        return await prismaClient.user.update({
            select: {
                ...this.select,
                ...select
            },
            data: {
                name,
                email,
                updated_dt: new Date()
            },
            where: {
                id: user.id
            }
        }) as User;
    }
}

export { UserService };