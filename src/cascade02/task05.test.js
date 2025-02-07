import { describe, test, expect } from "vitest";
import { solve } from "./task05.js";
import readInputs from "../read-inputs.js";

let inputs = readInputs(import.meta.url);

describe("cascade02 task05", () => {
  test("it should work for examples", () => {
    expect(
      solve(
        "",
        "0,0-6,0 0,0-0,6 6,0-6,6 0,6-6,6 2,1-2,2 4,1-4,2 2,4-4,4",
        "3,1:10 5,1:20",
        "3,3",
        [
          "U4 R4 D4 U4 S2 L4 D2 R2 D2 S10",
          "U4 R4 D4 S2 U2 L2 D2 S10",
          "U4 R4 D2 S2 D2 U4 L2 S10",
          "U4 S2 R4 D4 U2 L2 D2 U2 L2 S10",
          "U4 R4 D2 S7 U2 L4 D2 S6 R2 D2 S10",
          "U4 R4 D4 U2 S2 U2 L4 S4 D4 U2 R2 D2 U2 L2 U2 R4 S10",
        ].join("\n"),
      ),
    ).toEqual("4,1,3,30,20");
  });

  test("it should work for input", () => {
    expect(solve(...inputs)).toEqual("36,2,19,708,266");
  });
});
