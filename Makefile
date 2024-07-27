# Run the tests with Deno, measure the time taken
deno:
	time deno run --import-map=import_map.json --allow-read --allow-write ./test.js

# Run the tests with Node.js, measure the time taken
node:
	time node ./test.js

clean:
	rm -f tests/*/output.html

.PHONY: deno node
