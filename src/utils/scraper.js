import * as process from "node:process";

async function downloadRequest(url) {
  let headers = { Cookie: `user_session=${process.env.CASCADES_SESSION}` };
  let options = { headers };
  let response = await fetch(url, options);
  if (response.status >= 400) {
    throw new Error(
      [
        `Failed to download from ${url} (${response.status})`,
        `Description: ${await response.text()}`,
      ].join("\n"),
    );
  }
  return response;
}

async function downloadContent(url) {
  let response = await downloadRequest(url);
  return await response.text();
}

export async function getTaskInput(cascade, task) {
  let url = `https://codecascades.com/tasks/${+cascade}/${+task}/input/1`;
  return await downloadContent(url);
}
