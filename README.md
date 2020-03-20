# egzek

[![Build, Test and Release](https://github.com/hasparus/egzek/workflows/Build,%20Test%20and%20Release/badge.svg)](https://github.com/hasparus/egzek/actions?query=workflow%3A%22Build+and+Test%22)
[![npm](https://img.shields.io/npm/v/egzek.svg)](https://www.npmjs.com/egzek)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Gitmoji](https://img.shields.io/badge/gitmoji-%20😜%20😍-FFDD67.svg?style=flat-square)](https://gitmoji.carloscuesta.me/)

**An opinionated wrapper around child_process.execSync.**

---

### Installation

```sh
yarn add --dev egzek
```

### Example

```ts
import { exec } from "egzek";

exec(`
  echo "commands are run sequentially" > ${filepath}
  cat ${filepath}
  rm ${filepath}
`);
```

Output:

```
 ➡ echo "commands are run sequentially" > /test-1.txt

 ➡ cat /test-1.txt
"commands are run sequentially"

 ➡ rm /test-1.txt
```

### Why?

- Bash is a hell to maintain. Node is a great alternative for utility scripts
- I wanted something smaller and simpler than [executive](https://www.npmjs.com/package/executive) and [execa](https://www.npmjs.com/package/execa).
  - **small**
    - 4.5kB unpacked
    - 479B gzipped, 428B Brotli.
    - 831B of uncompressed JavaScript code, 1.2kB of types.
  - **simple**
    - one exported function and one exported type
    - almost the same public API as `child_process.execSync`
      - common defaults for `stdio` and `encoding` options

### Public API

```ts
import { ExecSyncOptions, StdioOptions } from "child_process";
export interface ExecOptions extends Omit<ExecSyncOptions, "encoding"> {
  /**
   * A directory in which the commands are run.
   */
  dir?: string;
  /**
   * The encoding used for all stdio inputs and outputs.
   * @default "utf-8"
   * @see https://nodejs.org/api/child_process.html#child_process_child_process_execsync_command_options
   */
  encoding?: BufferEncoding;
  /**
   * Child's stdio configuration.
   * @default "inherit"
   */
  stdio?: StdioOptions;
}
export declare namespace ExecOptions {
  interface Pipe extends ExecOptions {
    stdio: "pipe" | [any, "pipe", any?];
  }
  interface Inherit extends ExecOptions {
    stdio?: "inherit" | [any, "inherit", any?];
  }
}
/**
 * @example
 *  exec(`
 *    echo "commands are run sequentially" > ${filepath}
 *    cat ${filepath}
 *  `);
 *
 * @returns array of strings when options.stdio is `pipe`, otherwise undefined
 */
export declare function exec(
  commands: string,
  options: ExecOptions.Pipe
): string[];
export declare function exec(
  commands: string,
  options?: ExecOptions.Inherit
): undefined;
```

#### Types from `@types/node`

- [**`BufferEncoding`**](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/7b08f4588e8f60c2668e39f97b4ba740f5f2b087/types/node/globals.d.ts#L236) _(global)_
- [**`StdioOptions`**](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/7b08f4588e8f60c2668e39f97b4ba740f5f2b087/types/node/child_process.d.ts#L99)
- [**`ExecSyncOptions`**](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/7b08f4588e8f60c2668e39f97b4ba740f5f2b087/types/node/child_process.d.ts#L326)
