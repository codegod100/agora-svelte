import fs from 'fs';
import { construct_svelte_component } from 'svelte/internal';


export const files =({ garden, node }) => {
	const directoryToMdFiles = {};
const retrieve = ({ garden, node }) => {
	// console.log("GARDEN", garden)
	// Get the list of directories in the current directory.
	const directories = fs.readdirSync(garden);

	// Create an empty object to store the mapping of directory names to lists of ".md" files.
	// Iterate over the directories.
	for (let directory of directories) {

		directory = garden + "/" + directory
		// console.log("DIR", directory)
		// If the directory is a directory, recursively go through it.
		if (fs.statSync(directory).isDirectory()) {
			// Get the list of ".md" files in the directory.
			const mdFiles = fs.readdirSync(directory).filter(file => file.endsWith('.md') && file.includes(node));

			// Add the directory name and the list of ".md" files to the mapping.
			if(mdFiles.length > 0) {
				console.log("MDFILES", mdFiles)
				directoryToMdFiles[directory] = mdFiles;
			}
			// Recursively go through the directory.
			retrieve({ garden: directory, node });
		}
	}
	// Return the mapping of directory names to lists of ".md" files.
	return directoryToMdFiles;
}

return retrieve({ garden, node });
}
