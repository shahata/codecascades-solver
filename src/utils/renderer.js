import * as path from "node:path";
import { fileURLToPath } from "node:url";
import { readFileSync, writeFileSync } from "node:fs";

import { getTaskInput } from "./scraper.js";

function renderTemplate(cascadeName, taskName, extension, model) {
  let __dirname = path.dirname(fileURLToPath(import.meta.url));
  let src = path.resolve(__dirname, "..");
  let templates = path.resolve(src, "..", "templates");
  let template = path.join(templates, "task");
  let fileName = `${path.join(src, cascadeName, taskName)}.${extension}`;
  let result = Object.keys(model).reduce(
    (result, key) => result.replaceAll(`{{${key}}}`, model[key]),
    readFileSync(`${template}.template.${extension}`).toString(),
  );
  writeFileSync(fileName, result);
  return fileName;
}

export async function downloadInput(cascade, task) {
  let input = await getTaskInput(cascade, task);
  let cascadeName = `cascade${cascade.padStart(2, "0")}`;
  let taskName = `task${task.padStart(2, "0")}`;
  return renderTemplate(cascadeName, taskName, "txt", { input });
}

export async function createSolver(cascade, task) {
  let cascadeName = `cascade${cascade.padStart(2, "0")}`;
  let taskName = `task${task.padStart(2, "0")}`;
  let txtFileName = await downloadInput(cascade, task);
  let jsFileName = renderTemplate(cascadeName, taskName, "js", {});
  let specFileName = renderTemplate(cascadeName, taskName, "spec.js", {
    cascadeName,
    taskName,
  });
  [jsFileName, specFileName, txtFileName].forEach(fn =>
    console.log(`Created ${fn}`),
  );
  console.log("");
}
