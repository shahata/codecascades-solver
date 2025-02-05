import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { readdirSync } from "node:fs";

function getAllInputs(dir) {
  return readdirSync(dir)
    .filter(x => x.match(/^input\d+\.txt$/))
    .map(x => parseInt(x.match(/\d+/).shift()))
    .sort((a, b) => a - b)
    .map(x => `${x}`)
    .map(input => `input${input.padStart(2, "0")}.txt`)
    .map(input => `${dir}/${input}`)
    .map(file => readFileSync(file).toString().trimEnd());
}

export default function readInputs(fileUrl) {
  let filename = fileURLToPath(fileUrl);
  let dirName = filename.slice(0, filename.lastIndexOf("/"));
  return getAllInputs(dirName);
}
