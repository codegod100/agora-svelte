import { subnodes, users, journals } from '$lib/files.ts'
import { GARDEN } from '$env/static/private';
import { redirect } from '@sveltejs/kit';
import { unified } from 'unified';
import markdown from 'remark-parse';
import wikiLinkPlugin from 'remark-wiki-link';
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'

import fs from 'fs';
import { sub } from 'edgedb/dist/primitives/bigint.js';
let processor = unified()
	.use(markdown, { gfm: true })
	.use(wikiLinkPlugin, { hrefTemplate: (link) => `/node/${link}`, pageResolver: (link) => [link] })
	.use(remarkRehype)
	.use(rehypeStringify)



export const load = ({ params }) => {
	const u = users();
	let subs = []
	for (const user of u) {
		subs = subs.concat(subnodes(GARDEN + "/" + user, [], user))
	}
	const j = journals(subs)
	let nodes = []
	for (const name in j) {
		if (name != "undefined") {
			const subs = j[name];
			nodes.push({ name, subnodes: subs })

		}
	}
	nodes = nodes.sort((a, b) => a.name.localeCompare(b.name)).reverse().slice(0, 30);

	for (const node of nodes) {
		for (const sub of node.subnodes) {
			let data = fs.readFileSync(sub.path, 'utf8')
			data = String(processor.processSync(data))
			sub.data = data
		}
	}
	// console.log("journals", j)
	return { users: u, nodes, node: "journals" }
}