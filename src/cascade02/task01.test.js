import { describe, test, expect } from "vitest";
import { solve } from "./task01.js";
import readInputs from "../read-inputs.js";

let inputs = readInputs(import.meta.url);

describe("cascade02 task01", () => {
  test("it should work for examples", () => {
    expect(solve("U2 S4 L3 U2 R10")).toEqual("8,5");
  });

  test("it should work for input", () => {
    expect(solve(...inputs)).toEqual("-4,28");
  });
});
