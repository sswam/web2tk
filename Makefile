deno:
	ln -sf deno.js env.js
	time deno run --allow-read --allow-write ./main.js tests/001-field/input.html tests/001-field/data.json out.html
node:
	ln -sf node.js env.js
	time node ./main.js tests/001-field/input.html tests/001-field/data.json out.html
