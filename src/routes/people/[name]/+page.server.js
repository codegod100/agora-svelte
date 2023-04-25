import { json } from "@sveltejs/kit";
import e from "../../../../../dbschema/edgeql-js";
import { createClient } from "edgedb";
const client = createClient();
const people = async (/** @type {any} */ name) => {
	const query = e.select(e.Person, (person) => ({
		id: true,
		name: true,
		filter: e.op(person.name, "=", name)
	}))
	return await query.run(client);
};

export async function load({ params }) {
	/**
	 * @type {any[]}
	 */
	let all = []
	const names = params.name.split(",")
	for (const name of names) {
		all = all.concat(await people(name));
	};
	console.log("ALL", all)
	return { all, string: JSON.stringify(all) }
}
