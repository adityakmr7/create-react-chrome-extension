#!/usr/bin/env node
const {execSync} = require('child_process');

const runCommand = command => {
    try {
        execSync(`${command}`, {stdio:'inherit'});
    }catch(e) {
        console.error(`Failed to execute ${command}`,e);
        return false
    }
    return true
}
let defaultRepoName = 'new-project'
let repoName = process.argv[2];

const getCheckoutCommand = `git clone --depth 1 https://github.com/adityakmr7/create-react-chrome-extension ${repoName}`;
const installDepsCommand = `cd ${repoName} && npm install`;
console.log(`Cloning the repository with name ${repoName}`);

const checkout =runCommand(getCheckoutCommand);
if(!checkout) process.exit(-1);

console.log(`Installing dependencies for ${repoName}`)
const installedDeps = runCommand(installDepsCommand);

if(!installedDeps) process.exec(-1);
console.info('Congrats! You have successfully created the boilerplate');

console.info(`Run command cd ${repoName}`);

console.info(`Happy Hacking!`)