deno:
	time deno run --import-map=import_map.json --allow-read --allow-write ./main.js tests/001-field/input.html tests/001-field/data.json out.html
node:
	time node ./main.js tests/001-field/input.html tests/001-field/data.json out.html
.PHONY: deno node
