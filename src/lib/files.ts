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

export const journals = (subnodes: Subnode[]) => {
	let nodes = []

	const s = groupBy(subnodes, v => {
		if (/^(\d{4})-(\d{2})-(\d{2})$/.test(v.node)) {
			return v.node
		}
	})
	return s
}

export const nodeFilter = (subnodes: Subnode[], node: string) => {
	let subs = []
	for (const sub of subnodes) {
		if (sub.node == node) {
			subs.push(sub)
		}
	}
	return subs
}

export const subnodes = (dirPath, arrayOfFiles: Subnode[], user): Subnode[] => {
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
