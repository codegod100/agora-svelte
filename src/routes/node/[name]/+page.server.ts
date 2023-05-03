import { GARDEN } from '$env/static/private';
import { unified } from 'unified';
import markdown from 'remark-parse';
import wikiLinkPlugin from 'remark-wiki-link';
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import { subnodes, users, nodeFilter } from '$lib/files.ts'

let processor = unified()
	.use(markdown)
	.use(remarkGfm)
	.use(wikiLinkPlugin, { hrefTemplate: (link) => `/node/${link}`, pageResolver: (link) => [link] })
	.use(remarkRehype)
	.use(rehypeStringify)

import fs from 'fs';




export const load = ({ params }) => {

	const u = users();
	let subs = []
	for (const user of u) {
		subs = subs.concat(subnodes(GARDEN + "/" + user, [], user))
	}
	subs = nodeFilter(subs, params.name)

	for (const sub of subs) {
		let data = fs.readFileSync(sub.path, 'utf8')
		sub.data = String(processor.processSync(data))
	}
	return { files: subs }
}

