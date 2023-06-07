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


	let data = fs.readFileSync(GARDEN + params.path, 'utf8')
	let body = processor.processSync(data).value
	console.log("NODE", body)
	return { body, node: params.path, raw: `<pre>${data}</pre>` }
}

