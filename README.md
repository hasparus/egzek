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

- I write my scripts in JS/TS. Bash is a hell to maintain.
- I wanted something smaller and simpler than [executive](https://www.npmjs.com/package/executive) and [execa](https://www.npmjs.com/package/execa).
  - **small**
    - 4.5kB unpacked
    - 437B gzipped, 364B Brotli.
    - 754B of actual code and types.
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

export declare function exec(
  commands: string,
  options?: ExecOptions
): Array<string | undefined>;
```

#### Types from `@types/node`

- [**`BufferEncoding`**](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/7b08f4588e8f60c2668e39f97b4ba740f5f2b087/types/node/globals.d.ts#L236) _(global)_
- [**`StdioOptions`**](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/7b08f4588e8f60c2668e39f97b4ba740f5f2b087/types/node/child_process.d.ts#L99)
- [**`ExecSyncOptions`**](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/7b08f4588e8f60c2668e39f97b4ba740f5f2b087/types/node/child_process.d.ts#L326)
