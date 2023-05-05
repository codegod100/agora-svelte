import fs from 'fs';
import path from 'path'
import { GARDEN } from '$env/static/private';

interface Lookup {
	/** node name */
	node: Node,
	journal: boolean // is this a journal?
}

export interface Subnode {
	path: string,
	node: string,
	user: string,
	data: string
}





export const users = (): string[] => {
	return fs.readdirSync(GARDEN).filter(file => fs.statSync(GARDEN + "/" + file).isDirectory());
}

const groupBy = <T>(array: T[], predicate: (value: T, index: number, array: T[]) => string) =>
	array.reduce((acc, value, index, array) => {
		(acc[predicate(value, index, array)] ||= []).push(value);
		return acc;
	}, {} as { [key: string]: T[] });

/**
* Returns an object with keys as dates in the format of "YYYY-MM-DD"
* and values as an array of Subnode objects with that date as their node property.
* @param subnodes Array of Subnode objects to group by date.
* @returns Object with keys as dates and values as arrays of Subnode objects.
*/

export const journals = (subnodes: Subnode[]) => {
	let nodes = []

	const s = groupBy(subnodes, v => {
		if (/^(\d{4})-(\d{2})-(\d{2})$/.test(v.node)) {
			return v.node
		}
	})
	return s
}

/**
 * Filters a list of Subnode objects based on their node property.
 *
 * @param {Subnode[]} subnodes - The list of Subnode objects to filter.
 * @param {string} node - The node to filter by.
 * @return {Subnode[]} - A new list of Subnode objects with only those whose node property matches the given node.
 */

export const nodeFilter = (subnodes: Subnode[], node: string) => {
	let subs = []
	for (const sub of subnodes) {
		if (sub.node.toLowerCase() == node.toLowerCase()) {
			subs.push(sub)
		}
	}
	return subs
}

/**
 * Recursively gets all subnodes of a directory path that are markdown files.
 * 
 * @param dirPath - The path to the directory to get subnodes from.
 * @param arrayOfFiles - An array of subnodes to add to. Defaults to an empty array.
 * @param user - The user getting the subnodes.
 * @returns An array of subnodes in the given directory path.
 */

export const subnodes = (dirPath: string, arrayOfFiles: Subnode[], user: string): Subnode[] => {
	const files = fs.readdirSync(dirPath)

	arrayOfFiles = arrayOfFiles || []

	files.forEach(function (file) {
		const fullPath = path.join(dirPath, "/", file)
		if (fs.statSync(fullPath).isDirectory()) {
			arrayOfFiles = subnodes(dirPath + "/" + file, arrayOfFiles, user)
		} else {
			if (file.endsWith(".md")) {
				arrayOfFiles.push({ path: fullPath, node: file.replace(".md", ""), user, data: "" })
			}
		}
	})

	return arrayOfFiles
}
