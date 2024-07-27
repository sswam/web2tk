import * as env from './node/env.js';
import { setEnv } from './env.js';
import * as server from './server.js';

/**
 * The main function, when run from the command-line.
 */
export async function main() {
	setEnv(env);

	// Define the tests directory
	const testsDir = 'tests';

	// Read the contents of the tests directory and filter for subdirectories
	const dirEntries = await env.readDir(testsDir, { withFileTypes: true });
	const subdirs = dirEntries
		.filter(dirent => dirent.isDirectory)
		.map(dirent => dirent.name)
		.sort();

	let failed = 0;

	// Iterate over each subdirectory
	for (const subdir of subdirs) {
		const dirName = env.path.join(testsDir, subdir);
		const input = env.path.join(dirName, 'input.html');
		const data = env.path.join(dirName, 'data.json');
		const output = env.path.join(dirName, 'output.html');
		const expect = env.path.join(dirName, 'expect.html');

		try {
			await server.processFiles(input, data, output);
		} catch (err) {
			console.error(`Failed to process files in ${dirName}: ${err.message}`);
			failed++;
			continue; // Skip comparison if processing failed
		}

		// Compare the contents of output.html and expect.html
		try {
			const [outputContent, expectContent] = await Promise.all([
				env.readTextFile(output),
				env.readTextFile(expect)
			]);

			if (outputContent === expectContent) {
				console.log(`PASS ${dirName}`);
			} else {
				console.log(`FAIL ${dirName}`);
				failed++;
			}
		} catch (err) {
			console.error(`Comparison failed for ${dirName}: ${err.message}`);
		}
	}

	if (failed) {
		console.log(`Tests failed: ${failed}`);
		env.exit(1);
	} else {
		console.log(`All tests passed.`);
	}
}

await main();
