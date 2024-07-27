let workDirHandle = null;

/**
 * Parses a string of HTML and returns a document fragment.
 *
 * @param {string} html - The HTML string to be parsed.
 * @returns {{document: DocumentFragment}} An object containing the document fragment with the parsed HTML.
 */
function parseHTML(html) {
	const parser = new DOMParser();
	html = `<wrap>${html}</wrap>`;
	let doc = parser.parseFromString(html, 'text/html');
	doc = doc.querySelector('wrap');
	const fragment = document.createDocumentFragment();
	while (doc.firstChild) {
		fragment.appendChild(doc.firstChild);
	}
	return { document: fragment };
}

/**
 * Formats a document fragment into an HTML string.
 *
 * @param {DocumentFragment} fragment - The fragment to be formatted into HTML string.
 * @returns {string} The HTML string representing the provided fragment.
 */
function formatHTML(fragment) {
	const wrap = document.createElement('wrap');
	wrap.appendChild(fragment);
	const html = wrap.innerHTML;
	return html;
}

/**
* Asks the user to select a directory and sets the global working directory handle.
*
* @returns {Promise<void>} A promise that resolves when the directory has been selected.
* @throws {Error} If the user cancels the directory selection or if the method is not supported.
*/
async function requestWorkDir() {
	workDirHandle = await window.showDirectoryPicker();
}

/**
 * Traverses a directory structure starting from the working directory handle.
 *
 * @param {string} filePath - The path of the file, with directories separated by '/'.
 * @param {boolean} [create=false] - Whether to create directories if they do not exist.
 * @returns {Promise<{currentDir: FileSystemDirectoryHandle, fileName: string}>}
 *          An object containing the current directory handle and the file name.
 * @throws {Error} If the working directory is not selected.
 */
async function traverseDirectory(filePath, create = false) {
	if (!workDirHandle) {
		throw new Error("Working directory not selected.");
	}

	const parts = filePath.split('/');
	let currentDir = workDirHandle;

	for (const part of parts.slice(0, -1)) {
		currentDir = await currentDir.getDirectoryHandle(part, { create });
	}

	return { currentDir, fileName: parts[parts.length - 1] };
}

/**
 * Reads the content of a text file.
 *
 * @param {string} filePath - The path of the file, with directories separated by '/'.
 * @returns {Promise<string>} The contents of the text file.
 */
async function readTextFile(filePath) {
	const { currentDir, fileName } = await traverseDirectory(filePath);
	const fileHandle = await currentDir.getFileHandle(fileName);
	const file = await fileHandle.getFile();
	return file.text();
}

/**
 * Writes contents to a text file, creating the file and directories if necessary.
 *
 * @param {string} filePath - The path of the file, with directories separated by '/'.
 * @param {string} contents - The content to write to the file.
 * @returns {Promise<void>}
 */
async function writeTextFile(filePath, contents) {
	const { currentDir, fileName } = await traverseDirectory(filePath, true);
	const fileHandle = await currentDir.getFileHandle(fileName, { create: true });
	const writable = await fileHandle.createWritable();
	await writable.write(contents);
	await writable.close();
}

export { parseHTML, formatHTML, requestWorkDir, readTextFile, writeTextFile };
