"use server"
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export async function getUsers() {
    const take = 10;
    const skip = 0;

    const [users, usersCount] = await prisma.$transaction([
        prisma.users.findMany({
            take,
            skip,
            orderBy: {
                id: 'desc',
            }
        }),
        prisma.users.count(),
    ]);

    const pageCount = Math.ceil(usersCount / take);

    return {
        users,
        pageCount,
    };
}

export async function getUser(id: number) {
    return await prisma.users.findUnique({
        where: {
            id,
        },
    });
}

export async function createUser(data: {
    name: string;
    email: string;
    password: string;

    
}) {
    return await prisma.users.create({
        data,
    });
}

export async function updateUser(id: number, data: {
    name: string;
    email: string;
}) {
    return await prisma.users.update({
        where: {
            id,
        },
        data,
    });
}

export async function deleteUser(id: number) {
    return await prisma.users.delete({
        where: {
            id,
        },
    });
}
