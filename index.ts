import { execSync, ExecSyncOptions } from "child_process";

const BLUE = `\u001b[36m`;
const RESET = `\u001b[0m`;

interface ExecOptions extends Omit<ExecSyncOptions, "encoding"> {
  dir?: string;
}

/**
 * @example
 *  exec(`
 *    echo "commands are run sequentially" > ${filepath}
 *    cat ${filepath}
 *  `);
 */
export function exec(
  commands: string,
  opts: ExecOptions = {}
): Array<string | undefined> {
  // eslint-disable-next-line no-param-reassign
  const cmds = commands
    .trim()
    .split("\n")
    .map(x => x.trim())
    .filter(x => x && !x.startsWith("#"));

  return cmds.map(cmd => {
    const dir = opts.dir;
    // avoiding spread and rest to make sure we don't bundle any helpers
    delete opts.dir;
    opts.stdio = opts.stdio || "inherit";
    (opts as ExecSyncOptions).encoding = "utf-8";

    const fullCommand = dir ? `cd ${dir} && ${cmd}` : cmd;

    try {
      // eslint-disable-next-line no-console
      console.log(`${BLUE} ➡ ${fullCommand.trim()} ${RESET}\n`);
      return (execSync(fullCommand, opts) as any) as string | undefined;
    } catch (err) {
      console.error("❌ ", fullCommand, "failed ❕");
      throw err;
    }
  });
}
