export const getPosts = async () => {
	await new Promise(resolve => {
		setTimeout(resolve, 5000)
	})
	return [
		{
			title: "a15m Quickstart Blog Tutorial",
			url: "https://remix.run/tutorials/blog"
		},
		{
			title: "Deep Dive Jokes App Tutorial",
			url: "https://remix.run/tutorials/jokes"
		},
		{
			title: "Remix Docs",
			url: "https://remix.run/docs"
		},
		{
			title: "a15m Quickstart Blog Tutorial",
			url: "https://remix.run/tutorials/blog"
		},
		{
			title: "Deep Dive Jokes App Tutorial",
			url: "https://remix.run/tutorials/jokes"
		},
		{
			title: "Remix Docs",
			url: "https://remix.run/docs"
		}
	]
}
