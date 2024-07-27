/**
 * Render the document with data, based on the 'd' attribute.
 *
 * @param {Document} doc - The HTML document DOM to process.
 * @param {Object} data - The data to use for replacements.
 */
export function process(doc, data) {
	// Get all elements with the 'd' attribute
	const elementsWithD = doc.querySelectorAll("[d]");

	// Iterate over the elements and replace the innerHTML with the corresponding data value
	const missing = [];
	for (const element of elementsWithD) {
		const key = element.getAttribute("d");
		if (!key) {
			continue;
		}
		if (!Object.prototype.hasOwnProperty.call(data, key)) {
			missing.push(key);
			continue;
		}
		element.textContent = data[key];
	}

	// Warn about any missing data
	if (missing.length > 0) {
		console.warn("Missing data:", missing);
	}
}
