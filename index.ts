import { execSync, ExecSyncOptions, StdioOptions } from "child_process";

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
 */
export function exec(
  commands: string,
  options: ExecOptions = { encoding: "utf-8" }
): Array<string | undefined> {
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

  return cmds.map(cmd => {
    const fullCommand = dir ? `cd ${dir} && ${cmd}` : cmd;

    try {
      console.log(`${BLUE} ➡ ${fullCommand.trim()} ${RESET}\n`);
      // execSync can return null. @types/node lies
      return execSync(fullCommand, opts) as string | undefined;
    } catch (err) {
      console.error("❌ ", fullCommand, "failed ❕");
      throw err;
    }
  });
}
