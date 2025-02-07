import { describe, test, expect } from "vitest";
import { solve } from "./task02.js";
import readInputs from "../read-inputs.js";

let inputs = readInputs(import.meta.url);

describe("cascade01 task02", () => {
  test("it should work for examples", () => {
    expect(solve("123456789abcdef00000000000000000", -4, 4)).toEqual(
      "67a498a2c910",
    );
  });

  test("it should work for input", () => {
    expect(solve(...inputs)).toEqual("170a239e18e1");
  });
});
