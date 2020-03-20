import assert from "assert";
import { expectType } from "ts-expect";

import { exec } from "../dist";

export function test() {
  const lines = exec(
    `
    echo "lorem ipsum dolor sit amet"
    echo Hello!
  `,
    { stdio: ["pipe", "pipe", "pipe"] }
  );

  expectType<string[]>(lines);
  assert.deepStrictEqual(lines, ["lorem ipsum dolor sit amet\n", "Hello!\n"]);
}
