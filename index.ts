import {
  execSync,
  ExecSyncOptions,
  StdioOptions,
  StdioPipe
} from "child_process";

const BLUE = `\u001b[36m`;
const RESET = `\u001b[0m`;

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
  export interface Pipe extends ExecOptions {
    stdio: "pipe" | [any, "pipe", any?];
  }
  export interface Inherit extends ExecOptions {
    stdio?: "inherit" | [any, "inherit", any?];
  }
}

/**
 * @internal
 * For type inference of `execSync` result.
 */
type ExecOptionsWithEncoding = ExecOptions & { encoding: BufferEncoding };

/**
 * @example
 *  exec(`
 *    echo "commands are run sequentially" > ${filepath}
 *    cat ${filepath}
 *  `);
 *
 * @returns array of strings when options.stdio is `pipe`, otherwise undefined
 */
export function exec(commands: string, options: ExecOptions.Pipe): string[];
export function exec(
  commands: string,
  options?: ExecOptions.Inherit
): undefined;
export function exec(
  commands: string,
  options: ExecOptions = { encoding: "utf-8" }
): string[] | undefined {
  const opts: ExecOptionsWithEncoding = options as ExecOptionsWithEncoding;
  opts.encoding = "utf-8";
  options.stdio = options.stdio || "inherit";
  // avoiding spread and rest to make sure we don't bundle any helpers
  const dir = options.dir;
  delete opts.dir;

  const cmds = commands
    .trim()
    .split("\n")
    .map(x => x.trim())
    .filter(x => x && !x.startsWith("#"));

  const res = cmds.map((cmd, i) => {
    const fullCommand = dir ? `cd ${dir} && ${cmd}` : cmd;

    try {
      console.log(
        `${i === 0 ? "" : "\n"}${BLUE} ➡ ${fullCommand.trim()} ${RESET}`
      );
      return execSync(fullCommand, opts) as string | null;
    } catch (err) {
      console.error("❌ ", fullCommand, "failed ❕");
      throw err;
    }
  });

  return res.includes(null) ? undefined : (res as string[]);
}
