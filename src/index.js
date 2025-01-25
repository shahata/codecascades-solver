import { solveAllTasks, solveAllCascades } from "./utils/solver.js";
import { execSync } from "node:child_process";
import * as process from "node:process";

if (!process.env.CASCADES_SESSION) {
  try {
    let session = execSync("cookies https://codecascades.com/ user_session");
    process.env.CASCADES_SESSION = session.toString();
  } catch {
    //
  }
}

if (process.env.CASCADES_SESSION) {
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
} else {
  console.error("***********************************************************");
  console.error("***********************************************************");
  console.error("**                                                       **");
  console.error("** You must set an environment variable CASCADES_SESSION **");
  console.error("** with the session cookie value from codecascades.com   **");
  console.error("**                                                       **");
  console.error("***********************************************************");
  console.error("***********************************************************");
  console.error("");
}
process.exit(0);
