import { files } from '$lib/files.ts'
import { GARDEN } from '$env/static/private';
import { redirect } from '@sveltejs/kit';


export const load = ({ params }) => {
	params.name = ""
	let m = files({ garden: GARDEN, node: params.name });
	const directories = Object.keys(m);
	const path = directories[Math.floor(Math.random() * directories.length)];
	const nodes = m[path];
	const file = nodes[Math.floor(Math.random() * nodes.length)];
	const nodeName = file.replace(".md", "")
	throw redirect(307, '/node/' + nodeName)
}