import * as path from "node:path";
import * as process from "node:process";
import { fileURLToPath } from "node:url";
import { performance } from "node:perf_hooks";
import { readdirSync } from "node:fs";
import readInputs from "./read-inputs.js";

async function timerify(fn) {
  let start = performance.now();
  let result = await fn();
  let end = performance.now();
  let duration = `(${Math.round(end - start)}ms)`;
  return { result, duration };
}

let __dirname = path.dirname(fileURLToPath(import.meta.url));

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

function getTasks(cascade) {
  try {
    let cascadeName = `cascade${cascade.padStart(2, "0")}`;
    return readdirSync(path.resolve(__dirname, cascadeName))
      .filter(x => x.match(/^task\d+\.js$/))
      .map(x => parseInt(x.match(/\d+/).shift()))
      .sort((a, b) => a - b)
      .map(x => `${x}`);
  } catch {
    console.error(`must pass valid cascade in first argument`);
    process.exit(0);
  }
}

async function solveAllTasks(cascade, task) {
  if (task) {
    await solveTask(cascade, task);
  } else {
    let tasks = getTasks(cascade);
    for (let task of tasks) {
      await solveTask(cascade, task);
    }
  }
}

function getCascades() {
  return readdirSync(path.resolve(__dirname))
    .filter(x => x.match(/^cascade\d+$/))
    .map(x => parseInt(x.match(/\d+/).shift()))
    .sort((a, b) => a - b)
    .map(x => `${x}`);
}

async function solveAllCascades() {
  let cascades = getCascades();
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
if (cascade) {
  await solveAllTasks(cascade, task).catch(err => console.error(err.stack));
} else {
  await solveAllCascades().catch(err => console.error(err.stack));
}
