import { parseHTML } from 'npm:linkedom';

function formatHTML(doc) {
	return doc.toString();
}

const { readTextFile, writeTextFile } = Deno;

const args = Deno.args;

export { parseHTML, formatHTML, readTextFile, writeTextFile, args };
