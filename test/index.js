// @ts-check
const { exec } = require("../dist");
const assert = require("assert");

/**
 * @param {string} s
 */
const clean = s =>
  s
    .replace(/\r|\u001b\[36m |\u001b\[0m|"/g, "")
    .split("\n")
    .map(s => s.trimRight());

const result = exec(`node ${__dirname}/test-1`, { stdio: "pipe" });

const actual = clean(result[0]);

const expected = clean(`\
➡ echo "commands are run sequentially" > ${__dirname}/test-1.txt 

➡ cat ${__dirname}/test-1.txt 

"commands are run sequentially" 
➡ rm ${__dirname}/test-1.txt 

`);

assert.deepStrictEqual(actual, expected);
