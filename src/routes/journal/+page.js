import { unified } from 'unified';
import markdown from 'remark-parse';
import wikiLinkPlugin from 'remark-wiki-link';
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'

let processor = unified()
	.use(markdown, { gfm: true })
	.use(wikiLinkPlugin)
	.use(remarkRehype)
	.use(rehypeStringify)
/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
	const res = await fetch(`https://anagora.org/journals.json`);
	const journals = await res.json();
	journals.forEach(journal => {
		journal.subnodes.forEach(async subnode => {
			try {
				subnode.content = String(processor.processSync(subnode.content));

			} catch (e) {
				console.error(e);
				subnode.content = subnode.content
			}
		})
	});
	return { journals };
}