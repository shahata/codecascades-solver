import * as path from "node:path";
import { fileURLToPath } from "node:url";
import { performance } from "node:perf_hooks";
import { existsSync, readdirSync } from "node:fs";

import readInputs from "./read-inputs.js";
import { createSolver } from "./renderer.js";

let duration;
async function timerify(log, fn) {
  let start = performance.now();
  let result = await fn();
  let end = performance.now();
  duration = `(${Math.round(end - start)}ms)`;
  if (result.next) {
    let iter = result;
    while (!result.done) result = await timerify(log, () => iter.next());
  } else {
    log(`${result.value || result} ${duration}`);
  }
  return result;
}

let __dirname = path.dirname(fileURLToPath(import.meta.url));

function solverFunction(cascade) {
  let dirName = `cascade${cascade.padStart(2, "0")}`;
  let moduleName = `${dirName}/solution`;
  let solver = path.resolve(__dirname, "..", `${moduleName}.js`);
  if (existsSync(solver)) {
    return async () => {
      let module = await import(`../${moduleName}.js`);
      let inputs = readInputs(new URL(`../${moduleName}.js`, import.meta.url));
      console.log(`Solution for ${moduleName}!!!`);
      console.log("----------------------------");
      let n = 0;
      let log = s => console.log(`Part ${++n}:`, s);
      for (let i = 0; i < inputs.length; i++) {
        await timerify(log, () => module.solve(...inputs.slice(0, i + 1)));
      }
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

function getAllCascades() {
  return getAllNumbers(path.resolve(__dirname, ".."), /^cascade\d+$/);
}

export async function solveAllTasks(cascade, task) {
  if (task) {
    await createSolver(cascade, task);
  } else {
    let solver = solverFunction(cascade);
    if (solver) await solver();
  }
}

export async function solveAllCascades() {
  for (let cascade of getAllCascades()) {
    await solveAllTasks(cascade);
  }
}
