import { parseHTML, readTextFile, writeTextFile, args } from './env.js';
import { process } from './web2tk.js';

export async function processFiles(inputFile, dataFile, outputFile) {
	// Read JSON data
	const jsonData = await readTextFile(dataFile);
	const data = JSON.parse(jsonData);

	// Read input.html
	const inputHtml = await readTextFile(inputFile);

	// Parse the input HTML into a DOM representation
	const { document: doc } = parseHTML(inputHtml);

	if (!doc) {
		throw new Error("Failed to parse the HTML.");
	}

	// Process the DOM by adding data.
	process(doc, data);

	// Serialize the modified DOM back to HTML
	const updatedHtml = doc.toString();

	// Write the updated HTML to output.html
	await writeTextFile(outputFile, updatedHtml);
}

export async function main() {
	const [input = "input.html", data = "data.json", output = "output.html"] = args;
	await processFiles(input, data, output);
}

if (typeof Deno !== 'undefined' && import.meta.main || typeof process !== 'undefined' && process?.versions?.node) {
	main();
}
