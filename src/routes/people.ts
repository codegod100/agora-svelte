import * as edgedb from "edgedb";

const client = edgedb.createClient();

// import e from '../../../dbschema/edgeql-js'; // auto-generated code

export const people = async () => {
	const query = e.select(e.Person, () => ({
		id: true,
		name: true,
	}));
	
	return await query.run(client);
}


