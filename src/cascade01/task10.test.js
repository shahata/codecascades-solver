import { describe, test, expect } from "vitest";
import { solve } from "./task10.js";
import { growFlowers } from "./task07.js";
import readInputs from "../read-inputs.js";

let inputs = readInputs(import.meta.url);

describe("cascade01 task10", () => {
  test("it should work for examples", () => {
    expect(
      solve(
        growFlowers([[3], [4, 2, 2]], [5, 10, 5, 5, 7, 8, 6, 6], 3),
        "17",
        growFlowers([[3], [2, 2, 4]], [7, 8, 6, 6, 5, 10, 5, 5], 3),
        "19",
        10,
        11,
      ),
    ).toEqual("3364:197,15279:373");
  });

  test("it should work for input", () => {
    expect(solve(...inputs)).toEqual(
      "2452252:5213,2344781:5122,2630740:5368,2321361:5166",
    );
  });
});
