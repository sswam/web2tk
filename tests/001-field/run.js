#!/usr/bin/env -S deno run --allow-read --allow-write

const { readTextFile, writeTextFile } = Deno;

// Read data.json
const jsonData = await readTextFile("data.json");
const dataObject = JSON.parse(jsonData);

// Read input.html
const inputHtml = await readTextFile("input.html");

// Replace placeholder in input.html with the data from data.json
const updatedHtml = inputHtml.replace(/<h1 d="greeting">.*<\/h1>/, `<h1 d="greeting">${dataObject.greeting}</h1>`);

// Write the updated content to output.html
await writeTextFile("output.html", updatedHtml);
