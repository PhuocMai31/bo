import childProcess from "child_process";
import  util from "util";
export const ping = (host) => {
  const exec = util.promisify(childProcess.exec);
  return exec(`ping -c 5   ${host}`);
};

export const runCommandLine = (commandLine) => {
  return exec(commandLine);
};
export const runMigrate = () => {
  return runCommandLine("sudo npx sequelize-cli db:migrate");
};
