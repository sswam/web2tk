/**
 * Render the document with data, based on the 'd' attribute.
 *
 * @param {Document} doc - The HTML document DOM to process.
 * @param {Object} data - The data to use for replacements.
 */
export function process(doc, data) {
	// Function to recursively find data based on the element's key path
	const findData = (keyPath, dataObj) => {
		return keyPath.reduce((obj, key) => (obj && obj[key] !== "undefined") ? obj[key] : undefined, dataObj);
	};

	// Function to set the content of an element
	const setContent = (element, value) => {
		if (typeof value === 'object') {
			for (const child of element.children) {
				const childKey = child.getAttribute("d");
				if (childKey && value.hasOwnProperty(childKey)) {
					setContent(child, value[childKey]);
				}
			}
		} else {
			element.textContent = value;
		}
	};

	// Get all elements with the 'd' attribute
	const elementsWithD = doc.querySelectorAll("[d]");

	// Iterate over the elements and replace the innerHTML with the corresponding data value
	const missing = [];
	for (const element of elementsWithD) {
		const keyPath = element.getAttribute("d").split(".");
		const value = findData(keyPath, data);
		if (typeof value === "undefined") {
			missing.push(keyPath.join("."));
			continue;
		}
		setContent(element, value);
	}

	// Warn about any missing data
	if (missing.length > 0) {
		console.warn("Missing data:", missing);
	}
}
