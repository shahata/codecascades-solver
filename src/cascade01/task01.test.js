import { describe, test, expect } from "vitest";
import { solve } from "./task01.js";
import readInputs from "../read-inputs.js";

let inputs = readInputs(import.meta.url);

describe("cascade01 task01", () => {
  test("it should work for examples", () => {
    expect(solve("01ab2f")).toEqual(84);
  });

  test("it should work for input", () => {
    expect(solve(...inputs)).toEqual(1935);
  });
});
