import path from 'path';
import { parseHTML } from 'linkedom';
import { promises as fs } from 'fs';

const args = process.argv.slice(2);

const exit = process.exit;

async function readDir(dir) {
	const dirEntries = await fs.readdir(dir, { withFileTypes: true });
	for (const dirEntry of dirEntries) {
		dirEntry.isDirectoryFn = dirEntry.isDirectory;
		Object.defineProperty(dirEntry, 'isDirectory', { get: dirEntry.isDirectoryFn });
	}
	return dirEntries;
}

async function readTextFile(filePath) {
	return await fs.readFile(filePath, 'utf8');
}

async function writeTextFile(filePath, data) {
	return await fs.writeFile(filePath, data, 'utf8');
}

function formatHTML(doc) {
	return doc.toString();
}

export { args, exit, readDir, path, readTextFile, writeTextFile, parseHTML, formatHTML };
