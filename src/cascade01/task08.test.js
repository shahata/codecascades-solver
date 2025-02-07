import { describe, test, expect } from "vitest";
import { solve } from "./task08.js";
import { growFlowers } from "./task07.js";
import readInputs from "../read-inputs.js";

let inputs = readInputs(import.meta.url);

describe("cascade01 task08", () => {
  test("it should work for examples", () => {
    expect(
      solve(
        growFlowers([[3], [4, 2, 2]], [5, 10, 5, 5, 7, 8, 6, 6], 3),
        19,
        10,
      ),
    ).toEqual(2050);
  });

  test("it should work for input", () => {
    expect(solve(...inputs)).toEqual(1588897);
  });
});
