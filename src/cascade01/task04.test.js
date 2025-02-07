import { describe, test, expect } from "vitest";
import { solve } from "./task04.js";
import readInputs from "../read-inputs.js";

let inputs = readInputs(import.meta.url);

describe("cascade01 task04", () => {
  test("it should work for examples", () => {
    expect(solve("abcde9876543210", 30)).toEqual("172,111,1486");
  });

  test("it should work for input", () => {
    expect(solve(...inputs)).toEqual("3201,3126,2911");
  });
});
