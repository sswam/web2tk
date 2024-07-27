import { parseHTML } from 'npm:linkedom';

const { readTextFile, writeTextFile } = Deno;

const args = Deno.args;

export { parseHTML, readTextFile, writeTextFile, args };
