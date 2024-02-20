import invariant from "tiny-invariant"
import { marked } from "marked"
import type { LoaderFunction } from "@remix-run/node"
import { json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { getPost } from "~/models/post.server"

type LoaderData = {
	title: string
	html: string
}

// This is the loader function for this route. It runs on the server and
export const loader: LoaderFunction = async ({ params }) => {
	const { slug } = params
	invariant(slug, "No slug provided")

	const post = await getPost(slug)
	invariant(post, "Post not found")
	invariant(post.content, "Post has no content")

	const html = await marked(post.content)
	return json<LoaderData>({ title: post.title, html })
}

export default function Post() {
	const { title, html } = useLoaderData() as LoaderData
	return (
		<div>
			<h1>{title}</h1>
			<div dangerouslySetInnerHTML={{ __html: html }} />
		</div>
	)
}
