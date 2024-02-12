import { PrismaClient } from "@prisma/client"

export const getPosts = async () => {
	const prisma = new PrismaClient()
	return prisma.post.findMany({
		select: {
			title: true,
			url: true,
			id: true
		}
	})
}

export const getPost = async (slug: string) => {
	const prisma = new PrismaClient()
	return prisma.post.findUnique({
		where: {
			url: slug
		}
	})
}
