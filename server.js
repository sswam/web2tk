import { env } from './env.js';
import * as web2tk from './web2tk.js';

/**
 * Loads input files, parses the HTML and JSON, processes with web2tk, and writes to an output file.
 *
 * @param {string} inputFile - Path to the input HTML file.
 * @param {string} dataFile - Path to the JSON data file.
 * @param {string} outputFile - Path where the output HTML file should be written.
 */
export async function processFiles(inputFile, dataFile, outputFile) {
	// Read JSON data
	const jsonData = await env.readTextFile(dataFile);
	const data = JSON.parse(jsonData);

	// Read input html
	const inputHtml = await env.readTextFile(inputFile);

	// Parse the input HTML into a DOM representation
	const { document: doc } = env.parseHTML(inputHtml);

	if (!doc) {
		throw new Error("Failed to parse the HTML.");
	}

	// Process the DOM by adding data
	web2tk.process(doc, data);

	// Serialize the modified DOM back to HTML
	const updatedHtml = env.formatHTML(doc);

	// Output the updated HTML
	await env.writeTextFile(outputFile, updatedHtml);
}
