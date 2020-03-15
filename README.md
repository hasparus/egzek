# egzek

[![Build and Test](https://github.com/hasparus/egzek/workflows/Build%20and%20Test/badge.svg)](https://github.com/hasparus/egzek/actions?query=workflow%3A%22Build+and+Test%22)
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
- 2.7 kB unpacked, 706 bytes of actual code
  - This may get lower when microbundle modern starts to work

### Public API

```ts
import { ExecSyncOptions } from "child_process";

interface ExecOptions extends Omit<ExecSyncOptions, "encoding"> {
  dir?: string;
}

export declare function exec(
  commands: string,
  opts?: ExecOptions
): Array<string | undefined>;
```
