import { describe, test, expect } from "vitest";
import { solve } from "./task07.js";
import readInputs from "../read-inputs.js";

let inputs = readInputs(import.meta.url);

describe("cascade01 task07", () => {
  test("it should work for examples", () => {
    expect(solve([[3], [4, 2, 2]], [5, 5, 10, 5, 7, 8, 6, 6], 3)).toEqual(70);

    expect(
      solve(
        "a5fb04",
        "d9ba947a5e7648154fa8b5561cf0a2d95f439ff5747bbb8e430d5a965a5c80226a2cad03e23c40162f88638a560da98047ce".split(
          "",
        ),
        3,
      ),
    ).toEqual(338);
  });

  test("it should work for input", () => {
    expect(solve(...inputs)).toEqual(228807506);
  });
});
