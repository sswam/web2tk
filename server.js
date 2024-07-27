import { parseHTML, readTextFile, writeTextFile, args } from './node/env.js';
import * as web2tk from './web2tk.js';

// Load input files, parse the DOM, process with web2tk, and write to an output file
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

	// Process the DOM by adding data
	web2tk.process(doc, data);

	// Serialize the modified DOM back to HTML
	const updatedHtml = doc.toString();

	// Write the updated HTML to output.html
	await writeTextFile(outputFile, updatedHtml);
}
