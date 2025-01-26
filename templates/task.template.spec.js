import { solve } from "./{{taskName}}.js";
import readInputs from "../utils/read-inputs.js";

let inputs = readInputs(import.meta.url);

describe("{{cascadeName}} {{taskName}}", () => {
  test("it should work for examples", () => {
    expect(solve(paste)).toEqual(paste);
  });

  test("it should work for input", () => {
    // expect(solve(...inputs)).toEqual(0);
  });
});
