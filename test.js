#!/usr/bin/env -S deno run --allow-read --allow-write

const isMain = import.meta.main;
console.log(isMain);
