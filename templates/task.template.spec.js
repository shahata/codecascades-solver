import { solve } from "./{{taskName}}.js";
import readInput from "../utils/read-input.js";

let inputs = readInput(import.meta.url);

describe("{{cascadeName}} {{taskName}}", () => {
  test("it should work for examples", () => {
    expect(solve(paste)).toEqual(paste);
  });

  test("it should work for input", () => {
    // expect(solve(...inputs)).toEqual(0);
  });
});
