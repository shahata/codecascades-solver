import { performance } from "node:perf_hooks";
import readInputs from "./read-inputs.js";

async function timerify(log, fn) {
  let start = performance.now();
  let result = await fn();
  let end = performance.now();
  let duration = `(${Math.round(end - start)}ms)`;
  if (result.next) {
    let iter = result;
    while (!result.done) result = await timerify(log, () => iter.next());
  } else {
    log(`${result.value || result} ${duration}`);
  }
  return result;
}

async function solveAllTasks(cascade) {
  let dirName = `cascade${cascade.padStart(2, "0")}`;
  let moduleName = `./${dirName}/solution.js`;
  let module = await import(moduleName);
  let inputs = readInputs(new URL(moduleName, import.meta.url));
  console.log(`Solution for ${dirName}!!!`);
  console.log("----------------------------");
  let n = 0;
  let log = s => console.log(`Part ${++n}:`, s);
  for (let i = 0; i < inputs.length; i++) {
    await timerify(log, () => module.solve(...inputs.slice(0, i + 1)));
  }
  console.log("");
}

await solveAllTasks("1");
await solveAllTasks("2");
