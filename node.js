import { parseHTML } from 'linkedom';
import { promises as fs } from 'fs';
async function readTextFile(filePath) {
	return await fs.readFile(filePath, 'utf8');
}
async function writeTextFile(filePath, data) {
	return await fs.writeFile(filePath, data, 'utf8');
}
const args = process.argv.slice(2);

export { parseHTML, readTextFile, writeTextFile, args };