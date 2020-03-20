import assert from "assert";
import { promises as fs } from "fs";
import { exec } from "../dist";

/**
 * makes the output a bit more OS independent
 */
const clean = (s: string) =>
  s
    .replace(/\r|\u001b\[36m |\u001b\[0m|"/g, "")
    .split("\n")
    .map(s => s.trimRight());

export const runTest = (path: string) =>
  exec(`ts-node -P ${__dirname}/tsconfig.json -e "require('${path}').test()"`, {
    stdio: "pipe"
  });

export function run() {
  fs.readdir(__dirname).then(fileNames =>
    fileNames
      .filter(name => name.match(/.*\.test\.ts$/))
      .forEach(name => {
        const path = __dirname + "/" + name;
        const testModule = require(path);
        const test = testModule.test as (() => void) | undefined;

        if (!test) {
          throw new Error(`test function is not exported from ${name}`);
        }

        if (
          "expectedStdout" in testModule &&
          typeof testModule.expectedStdout === "string"
        ) {
          const expected = clean(testModule.expectedStdout);

          const result = runTest(path);
          const actual = clean(result[0]);

          assert.deepStrictEqual(actual, expected);
        } else {
          runTest(path);
        }
      })
  );
}
