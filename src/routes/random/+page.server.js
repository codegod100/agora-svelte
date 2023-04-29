import { GARDEN } from '$env/static/private';
import { redirect } from '@sveltejs/kit';
import { subnodes, users, journals } from '$lib/files.ts'

export const load = ({ params }) => {
	params.name = ""

	const u = users();
	let subs = []
	for (const user of u) {
		subs = subs.concat(subnodes(GARDEN + "/" + user, [], user))
	}
	const sub = subs[Math.floor(Math.random() * subs.length)];
	throw redirect(307, '/node/' + sub.node)
}