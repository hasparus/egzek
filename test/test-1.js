// @ts-check
const { exec } = require("../dist");

const filepath = `${__dirname}/test-1.txt`;

exec(`
  echo "commands are run sequentially" > ${filepath}
  cat ${filepath}
  rm ${filepath}
`);
