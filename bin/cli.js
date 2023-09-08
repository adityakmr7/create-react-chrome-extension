#!/usr/bin/env node
const { execSync } = require("child_process");
const { promisify } = require("util");
const fs = require("fs");
const path = require("path");
const rm = promisify(fs.rm);
const runCommand = async (command) => {
  try {
    execSync(`${command}`, { stdio: "inherit" });
  } catch (e) {
    console.error(`Failed to execute ${command}`, e);
    return false;
  }
  return true;
};
let defaultRepoName = "new-project";
let repoName = process.argv[2];
const currentPath = process.cwd();
const projectPath = path.join(currentPath, repoName);
if (!repoName) {
  console.log(
    `Since you did not provide a project name. We are calling it ${defaultRepoName}`
  );
  repoName = defaultRepoName;
}
const start = async () => {
  try {
    const getCheckoutCommand = `git clone --depth 1 https://github.com/adityakmr7/create-react-chrome-extension ${repoName}`;
    const rmGit = rm(path.join(projectPath, ".git"), {
      recursive: true,
      force: true,
    });
    // remove the installation file
    const rmBin = rm(path.join(projectPath, "bin"), {
      recursive: true,
      force: true,
    });
    await Promise.all([rmGit, rmBin]);
    const installDepsCommand = `cd ${repoName} && npm install`;
    console.log(`Cloning the repository with name ${repoName}`);

    const checkout = runCommand(getCheckoutCommand);
    if (!checkout) process.exit(-1);

    console.log(`Installing dependencies for ${repoName}`);
    const installedDeps = runCommand(installDepsCommand);

    if (!installedDeps) process.exec(-1);
    console.info("Congrats! You have successfully created the boilerplate");

    console.info(`Run command cd ${repoName}`);

    console.info(`Happy Hacking!`);
  } catch (e) {
    // clean up in case of error, so the user does not have to do it manually
    fs.rmSync(projectPath, { recursive: true, force: true });
    console.log(e);
  }
};
start()
  .then(() => {
    console.info(`Happy Hacking!`);
  })
  .catch((err) => {
    console.log(err);
  });
