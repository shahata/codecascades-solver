import * as path from "node:path";
import * as process from "node:process";
import { fileURLToPath } from "node:url";
import { performance } from "node:perf_hooks";
import { readdirSync } from "node:fs";
import readInputs from "./read-inputs.js";

let __dirname = path.dirname(fileURLToPath(import.meta.url));

async function timerify(fn) {
  let start = performance.now();
  let result = await fn();
  let end = performance.now();
  let duration = `(${Math.round(end - start)}ms)`;
  return { result, duration };
}

async function solveTask(cascade, task) {
  let dirName = `cascade${cascade.padStart(2, "0")}`;
  let taskName = `task${task.padStart(2, "0")}`;
  let moduleName = `./${dirName}/${taskName}.js`;
  let module = await import(moduleName);
  let inputs = readInputs(new URL(moduleName, import.meta.url));
  console.log(`Solution for ${dirName}/${taskName}!!!`);
  console.log("----------------------------");
  let { result, duration } = await timerify(() => module.solve(...inputs));
  console.log(`${result}`, duration);
  console.log("");
}

function getFiles(dir, regexp) {
  return readdirSync(dir)
    .filter(x => x.match(regexp))
    .map(x => parseInt(x.match(/\d+/).shift()))
    .sort((a, b) => a - b)
    .map(x => `${x}`);
}

function getTasks(cascade) {
  try {
    let cascadeName = `cascade${cascade.padStart(2, "0")}`;
    return getFiles(path.resolve(__dirname, cascadeName), /^task\d+\.js$/);
  } catch {
    console.error(`must pass valid cascade in first argument`);
    process.exit(0);
  }
}

async function solveAllTasks(cascade) {
  let tasks = getTasks(cascade);
  for (let task of tasks) {
    await solveTask(cascade, task);
  }
}

async function solveAllCascades() {
  let cascades = getFiles(__dirname, /^cascade\d+$/);
  for (let cascade of cascades) {
    await solveAllTasks(cascade);
  }
}

let cascade = process.argv[2];
let task = process.argv[3];
if (process.argv[2] && process.argv[2].includes("/")) {
  let clean = process.argv[2].split("/").slice(-2);
  let cascadeNum = parseInt(clean[0].match(/\d+/).pop());
  let taskNum = parseInt(clean[1].match(/\d+/).pop());
  if (Number.isNaN(cascadeNum) || Number.isNaN(taskNum)) {
    console.error("Invalid arguments");
    process.exit(0);
  }
  cascade = `${cascadeNum}`;
  task = `${taskNum}`;
}
if (task) await solveTask(cascade, task);
else if (cascade) await solveAllTasks(cascade);
else await solveAllCascades();
