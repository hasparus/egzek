// @ts-check
const { exec } = require("../dist");

const filepath = `${__dirname}/inherit.test.txt`;

export function test() {
  exec(`
    echo "commands are run sequentially" > ${filepath}
    cat ${filepath}
    rm ${filepath}
  `);
}

export const expectedStdout = `\
➡ echo "commands are run sequentially" > ${__dirname}/inherit.test.txt 

➡ cat ${__dirname}/inherit.test.txt 
"commands are run sequentially"

➡ rm ${__dirname}/inherit.test.txt 
`;
