// Replace elements' textContent with corresponding JSON value based on 'd' attribute
export function process(doc, data) {
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
