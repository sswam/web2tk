# Run the code with Deno, measure the time taken
deno:
	time deno run --import-map=import_map.json --allow-read --allow-write ./main.js tests/001-field/input.html tests/001-field/data.json out.html

# Run the code with Node.js, measure the time taken
node:
	time node ./main.js tests/001-field/input.html tests/001-field/data.json out.html

.PHONY: deno node
