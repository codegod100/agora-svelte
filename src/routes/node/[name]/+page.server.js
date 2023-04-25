import { GARDEN } from '$env/static/private';
import { unified } from 'unified';
import markdown from 'remark-parse';
import wikiLinkPlugin from 'remark-wiki-link';
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'

let processor = unified()
	.use(markdown, { gfm: true })
	.use(wikiLinkPlugin, { hrefTemplate: (link) => `/node/${link}`, pageResolver: (link) => [link] })
	.use(remarkRehype)
	.use(rehypeStringify)

import fs from 'fs';


const files = ({ garden, node }) => {
	// console.log("GARDEN", garden)
	// Get the list of directories in the current directory.
	const directories = fs.readdirSync(garden);

	// Create an empty object to store the mapping of directory names to lists of ".md" files.
	const directoryToMdFiles = {};

	// Iterate over the directories.
	for (let directory of directories) {

		directory = garden + "/" + directory
		// console.log("DIR", directory)
		// If the directory is a directory, recursively go through it.
		if (fs.statSync(directory).isDirectory()) {

			// Get the list of ".md" files in the directory.
			const mdFiles = fs.readdirSync(directory).filter(file => file.endsWith('.md') && file.includes(node));

			// Add the directory name and the list of ".md" files to the mapping.
			directoryToMdFiles[directory] = mdFiles;

			// Recursively go through the directory.
			files({ garden: directory, node });
		}
	}
	console.log("MAP", directoryToMdFiles)

	// Return the mapping of directory names to lists of ".md" files.
	return directoryToMdFiles;
}


export const load = ({ params }) => {


	let m = files({ garden: GARDEN, node: params.name });
	console.log(m)
	let d = []
	for (const path in m) {
		const user = path.replace(GARDEN + "/", '')
		const files = m[path]
		for (const file of files) {
			console.log(file)
			let data = fs.readFileSync(path + "/" + file, 'utf8')
			data = String(processor.processSync(data))
			console.log(data)
			d.push({ node: params.name, data, path: path + '/' + file, user })
		}
	}

	return { files: d }
}

