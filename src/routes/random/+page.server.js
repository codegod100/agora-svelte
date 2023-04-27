import fs from 'fs';
import { files } from '$lib/files.ts'
import { GARDEN } from '$env/static/private';
import { unified } from 'unified';
import markdown from 'remark-parse';
import wikiLinkPlugin from 'remark-wiki-link';
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'

let processor = unified()
	.use(markdown, { gfm: true })
	.use(wikiLinkPlugin, { hrefTemplate: (link) => `/node/${link}`, pageResolver: (link) => [link] })
	.use(remarkRehype)
	.use(rehypeStringify)

export const load = ({ params }) => {
	params.name = ""
	let m = files({ garden: GARDEN, node: params.name });
	const directories = Object.keys(m);
	const path = directories[Math.floor(Math.random() * directories.length)];
	const nodes = m[path];
	const file = nodes[Math.floor(Math.random() * nodes.length)];
	const user = path.replace(GARDEN + "/", '')

	let data = fs.readFileSync(path + "/" + file, 'utf8')
	data = String(processor.processSync(data))


	return { node: file.replace(".md", ""), files: [{ node: file.replace(".md", ""), data, path: path + '/' + file, user }] }
}