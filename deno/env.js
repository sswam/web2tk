import * as path from "https://deno.land/std/path/mod.ts";
import { parseHTML } from 'npm:linkedom';

const args = Deno.args;

const exit = Deno.exit;

function formatHTML(doc) {
	return doc.toString();
}

const { readTextFile, writeTextFile } = Deno;

async function readDir(dir) {
	const dirEntries = [];
	for await (const dirEntry of Deno.readDir(dir)) {
		dirEntries.push(dirEntry);
	}
	return dirEntries;
}

export { args, exit, readDir, path, readTextFile, writeTextFile, parseHTML, formatHTML };
