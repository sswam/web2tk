# Run the code with Deno, measure the time taken
deno:
	time deno run --import-map=import_map.json --allow-read --allow-write ./main.js tests/002-fragment/input.html tests/002-fragment/data.json out.html

# Run the code with Node.js, measure the time taken
node:
	time node ./main.js tests/002-fragment/input.html tests/002-fragment/data.json out.html

.PHONY: deno node
