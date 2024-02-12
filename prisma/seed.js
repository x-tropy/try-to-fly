import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function seed() {
	await prisma.post.deleteMany({
		where: {
			id: { not: undefined }
		}
	})
	await prisma.post.create({
		data: {
			title: "a15m Quickstart Blog Tutorial",
			url: "quick-start",
			content: "This is the content of the quick start blog tutorial"
		}
	})
	await prisma.post.create({
		data: {
			title: "Deep Dive Jokes App Tutorial",
			url: "deep-dive",
			content: "__This is__ the content of the deep dive jokes app tutorial"
		}
	})
	await prisma.post.create({
		data: {
			title: "Remix Docs",
			url: "remix-docs",
			content: "# This \n **is** the content of the remix docs"
		}
	})
	await prisma.post.create({
		data: {
			title: "b15m Quickstart Blog Tutorial",
			url: "b-15",
			content: "This is the content of the another quick start blog tutorial"
		}
	})
}

seed()
	.catch(e => {
		console.error(e)
		process.exit(1)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})
