#!/usr/bin/env -S deno run --allow-read --allow-write

import { parseHTML } from 'npm:linkedom';

const { readTextFile, writeTextFile } = Deno;

// Replace elements' innerHTML with corresponding JSON value based on 'd' attribute
function process(doc, data) {
	// Get all elements with the 'd' attribute
	const elementsWithD = doc.querySelectorAll("[d]");

	// Iterate over the elements and replace the innerHTML with the corresponding JSON value
	for (const element of elementsWithD) {
		const key = element.getAttribute("d");
		if (key && data.hasOwnProperty(key)) {
			element.textContent = data[key];
		}
	}
}

// Handle file I/O operations: read input HTML, process its DOM, and write updated HTML
async function processFiles(inputFile, dataFile, outputFile) {
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
	await writeTextFile("output.html", updatedHtml);
}

// Main entry point: calls processFiles with the file names from args or defaults
async function main(args) {
	const [input = "input.html", data = "data.json", output = "output.html"] = args;
	await processFiles(input, data, output);
}

if (import.meta.main) {
	await main(Deno.args);
}
