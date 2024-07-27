import { args } from './node/env.js';
import * as server from './server.js';

/**
 * The main function, when run from the command-line.
 */
export async function main() {
	try {
		const [input = "input.html", data = "data.json", output = "output.html"] = args;
		await server.processFiles(input, data, output);
	} catch (err) {
		console.error(`Failed to process files: ${err.message}`);
		process.exit(1);
	}
}

await main();
