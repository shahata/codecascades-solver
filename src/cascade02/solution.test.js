import { describe, test, expect } from "vitest";
import { solve } from "./solution.js";
import readInputs from "../utils/read-inputs.js";

let inputs = readInputs(import.meta.url);

describe("cascade02 task01", () => {
  test("it should work for examples", () => {
    expect(solve("U2 S4 L3 U2 R10")).toEqual("8,5");
  });

  test("it should work for input", () => {
    expect(solve(...inputs.slice(0, 1))).toEqual("-4,28");
  });
});

describe("cascade02 task02", () => {
  test("it should work for examples", () => {
    expect(solve("U2 S4 L3 U2 R10", "0,0-0,10 7,5-7,5")).toEqual("6,5,8");
  });

  test("it should work for input", () => {
    expect(solve(...inputs.slice(0, 2))).toEqual("19,17,56");
  });
});

describe("cascade02 task03", () => {
  test("it should work for examples", () => {
    expect(
      solve(
        "U2 S4 L3 U2 R10 D2",
        "0,0-0,10 7,5-7,5",
        "1,3:1 3,5:4 3,7:8 6,5:10",
      ),
    ).toEqual("15,13");
  });

  test("it should work for input", () => {
    expect(solve(...inputs.slice(0, 3))).toEqual("334,169");
  });
});

describe("cascade02 task04", () => {
  test("it should work for examples", () => {
    expect(
      solve(
        "U4 R4 D4 S2 U2 S1 L2 D2",
        "0,0-6,0 0,0-0,6 6,0-6,6 0,6-6,6 2,1-2,2 4,1-4,2 2,4-4,4",
        "3,1:10 5,1:20",
        "3,3",
      ),
    ).toEqual("18,4,3");

    expect(
      solve(
        "U4 R4 D4 S2 U2 L2 D2",
        "0,0-6,0 0,0-0,6 6,0-6,6 0,6-6,6 2,1-2,2 4,1-4,2 2,4-4,4",
        "3,1:10 5,1:20",
        "3,3",
      ),
    ).toEqual("18,3,3");

    expect(
      solve(
        "U4 S4 R4 D2 L4 U2 S10",
        "0,0-6,0 0,0-0,6 6,0-6,6 0,6-6,6 2,1-2,2 4,1-4,2 2,4-4,4",
        "3,1:10 5,1:20",
        "3,3",
      ),
    ).toEqual("28,1,5");

    expect(
      solve(
        "U4 S1 D2 R4",
        "0,0-6,0 0,0-0,6 6,0-6,6 0,6-6,6 2,1-2,2 4,1-4,2 2,4-4,4",
        "3,1:10 5,1:20",
        "3,3",
      ),
    ).toEqual("7,1,3");
  });

  test("it should work for input", () => {
    expect(solve(...inputs.slice(0, 4))).toEqual("159,13,17");
  });
});

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
