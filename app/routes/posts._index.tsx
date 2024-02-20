import type { LoaderFunction, MetaFunction } from "@remix-run/node"
import { Link, json, useLoaderData } from "@remix-run/react"

import { getPosts } from "~/models/post.server"

type LoaderData = {
	posts: Awaited<ReturnType<typeof getPosts>>
}

export const meta: MetaFunction = () => {
	return [
		{
			name: "description",
			content: "A list of posts"
		},
		{ title: "Posts" }
	]
}

export const loader: LoaderFunction = async () => {
	const posts = await getPosts()
	return json<LoaderData>({ posts })
}

export default function App() {
	const { posts } = useLoaderData() as LoaderData
	return (
		<div>
			<h1>Posts</h1>
			<ul>
				{posts.map((post, index) => (
					<li key={index}>
						<Link to={post.url}>
							{post.id} {" 💡 "} {post.title}
						</Link>
					</li>
				))}
			</ul>
		</div>
	)
}
