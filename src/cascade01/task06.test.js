import { describe, test, expect } from "vitest";
import { solve } from "./task06.js";
import readInputs from "../read-inputs.js";

let inputs = readInputs(import.meta.url);

describe("cascade01 task06", () => {
  test("it should work for examples", () => {
    expect(
      solve(
        "a5fb04",
        "d9ba947a5e7648154fa8b5561cf0a2d95f439ff5747bbb8e430d5a965a5c80226a2cad03e23c40162f88638a560da98047ce".split(
          "",
        ),
      ),
    ).toEqual("17,279");
  });

  test("it should work for input", () => {
    expect(solve(...inputs)).toEqual("14884,6210354");
  });
});
