import { describe, test, expect } from "vitest";
import { solve } from "./task03.js";
import readInputs from "../read-inputs.js";

let inputs = readInputs(import.meta.url);

describe("cascade01 task03", () => {
  test("it should work for examples", () => {
    expect(
      solve(
        new Array(5).fill("aa155aa555aa955aad55ab155ab555ab955abd55").join(""),
        20,
      ),
    ).toEqual(41);
    expect(
      solve(
        new Array(5).fill("aa155aa555aa955aad55ab155ab555ab955abd55").join(""),
      ),
    ).toEqual(7209);
  });

  test("it should work for input", () => {
    expect(solve(...inputs)).toEqual(36461);
  });
});
