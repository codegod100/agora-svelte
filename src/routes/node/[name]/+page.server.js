import { GARDEN } from '$env/static/private';
import { unified } from 'unified';
import markdown from 'remark-parse';
import wikiLinkPlugin from 'remark-wiki-link';
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import { files } from '$lib/files.ts'

let processor = unified()
	.use(markdown, { gfm: true })
	.use(wikiLinkPlugin, { hrefTemplate: (link) => `/node/${link}`, pageResolver: (link) => [link] })
	.use(remarkRehype)
	.use(rehypeStringify)

import fs from 'fs';




export const load = ({ params }) => {


	let m = files({ garden: GARDEN, node: params.name });
	console.log("M", m)
	let d = []
	for (const path in m) {
		const user = path.replace(GARDEN + "/", '')
		const files = m[path]
		for (const file of files) {
			console.log(file)
			let data = fs.readFileSync(path + "/" + file, 'utf8')
			data = String(processor.processSync(data))
			console.log(data)
			d.push({ node: params.name, data, path: path + '/' + file, user })
		}
	}

	return { files: d }
}

