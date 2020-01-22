const { exec } = require("../dist");

const filepath = `./test-1.txt`;

exec(`
  echo "commands are run sequentially" > ${filepath}
  cat ${filepath}
`);
