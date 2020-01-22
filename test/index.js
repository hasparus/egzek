// @ts-check
const { exec } = require("../dist");
const assert = require("assert");

const result = exec(`node ${__dirname}/test-1`, { stdio: "pipe" });

assert.equal(
  result[0].replace("\r", ""),
  `\
\u001b[36m ➡ echo "commands are run sequentially" > ./test-1.txt \u001b[0m

\u001b[36m ➡ cat ./test-1.txt \u001b[0m

"commands are run sequentially" 
`
);
