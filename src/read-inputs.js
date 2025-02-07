import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { readdirSync } from "node:fs";

function getAllInputs(dir, taskNum) {
  return readdirSync(dir)
    .filter(x => x.match(/^task\d+\.txt$/))
    .map(x => parseInt(x.match(/\d+/).shift()))
    .filter(x => x <= taskNum)
    .sort((a, b) => a - b)
    .map(x => `${x}`)
    .map(input => `task${input.padStart(2, "0")}.txt`)
    .map(input => `${dir}/${input}`)
    .map(file => readFileSync(file).toString().trimEnd());
}

export default function readInputs(fileUrl) {
  let filename = fileURLToPath(fileUrl);
  let dirName = filename.slice(0, filename.lastIndexOf("/"));
  let taskNum = +filename.split("/").at(-1).match(/\d+/).pop();
  return getAllInputs(dirName, taskNum);
}
