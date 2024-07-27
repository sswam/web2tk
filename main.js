import { args } from './node/env.js';
import * as server from './server.js';

// The main function, when run from the command-line
export async function main() {
	const [input = "input.html", data = "data.json", output = "output.html"] = args;
	await server.processFiles(input, data, output);
}

await main();
