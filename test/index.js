// @ts-check
const { exec } = require("../dist");
const assert = require("assert");

const result = exec(`node ${__dirname}/test-1`, { stdio: "pipe" });

assert.deepStrictEqual(
  result[0].replace(/\r|\u001b\[36m |\u001b\[0m/g, "").split("\n"),
  `\
➡ echo "commands are run sequentially" > ${__dirname}/test-1.txt 

➡ cat ${__dirname}/test-1.txt 

"commands are run sequentially" 
➡ rm ${__dirname}/test-1.txt 

`.split("\n")
);
