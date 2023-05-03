// 

import { redirect } from '@sveltejs/kit';

export const load = ({ params }) => {
	params.name = ""

	const date = new Date().toISOString().split('T')[0]
	throw redirect(307, '/node/' + date)
}