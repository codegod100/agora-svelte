import { GARDEN } from '$env/static/private';
import { redirect } from '@sveltejs/kit';
import { subnodes, users, journals, nodeFilter } from '$lib/files.ts'
import fs from 'fs';

export const load = ({ params }) => {
	params.name = ""

	const u = users();
	let subs = []
	for (const user of u) {
		subs = subs.concat(subnodes(GARDEN + "/" + user, [], user))
	}
	subs = nodeFilter(subs, params.node)

	let link
	for (const sub of subs) {
		let data = fs.readFileSync(sub.path, 'utf8')
		// sub.data = String(processor.processSync(data))
		console.log("DATA", data)
		let match = data.match(/#go (.*)/)
		if (match) {
			console.log("MATCH")
			link = match[1]
			console.log("LINK", link)
			throw redirect(307, link)
		}
	}
}