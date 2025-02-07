import { describe, test, expect } from "vitest";
import { solve } from "./task05.js";
import readInputs from "../read-inputs.js";

let inputs = readInputs(import.meta.url);

describe("cascade01 task05", () => {
  test("it should work for examples", () => {
    expect(solve("a5fb04")).toEqual("6,29");
  });

  test("it should work for input", () => {
    expect(solve(...inputs)).toEqual("162385,730417");
  });
});
