import * as path from "node:path";
import * as process from "node:process";
import { fileURLToPath } from "node:url";
import { performance } from "node:perf_hooks";
import { existsSync, readdirSync } from "node:fs";

import readInput from "./read-input.js";
import { downloadInput, createSolver } from "./renderer.js";

let duration;
async function timerify(fn) {
  let start = performance.now();
  let result = await fn();
  let end = performance.now();
  duration = `(${Math.round(end - start)}ms)`;
  return result;
}

let __dirname = path.dirname(fileURLToPath(import.meta.url));

function solverFunction(cascade, task) {
  let dirName = `cascade${cascade.padStart(2, "0")}`;
  let moduleName = `${dirName}/task${task.padStart(2, "0")}`;
  let solver = path.resolve(__dirname, "..", `${moduleName}.js`);
  if (existsSync(solver)) {
    return async () => {
      let module = await import(`../${moduleName}.js`);
      let input = readInput(new URL(`../${moduleName}.js`, import.meta.url));
      console.log(`Solution for ${moduleName}!!!`);
      console.log("----------------------------");
      console.log(await timerify(() => module.solve(input)), duration);
      console.log("");
    };
  }
}

function getAllNumbers(dir, pattern) {
  return readdirSync(dir)
    .filter(x => x.match(pattern))
    .map(x => parseInt(x.match(/\d+/).shift()))
    .sort((a, b) => a - b)
    .map(x => `${x}`);
}

function getAllTasks(cascade) {
  try {
    let dirName = `cascade${cascade.padStart(2, "0")}`;
    return getAllNumbers(
      path.resolve(__dirname, "..", dirName),
      /^task\d+\.js$/,
    );
  } catch {
    console.error(`must pass valid cascade in first argument`);
    process.exit(0);
  }
}

function getAllCascades() {
  return getAllNumbers(path.resolve(__dirname, ".."), /^cascade\d+$/);
}

export async function solveAllTasks(cascade, task) {
  if (task) {
    let solver = solverFunction(cascade, task);
    if (solver) await solver();
    else await createSolver(cascade, task);
  } else {
    for (let task of getAllTasks(cascade)) {
      await downloadInput(cascade, task);
      await solveAllTasks(cascade, task);
    }
  }
}

export async function solveAllCascades() {
  for (let cascade of getAllCascades()) {
    await solveAllTasks(cascade);
  }
}
