import { solve } from "./task04.js";
import readInput from "../utils/read-input.js";

let inputs = readInput(import.meta.url);

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
    expect(solve(...inputs)).toEqual("159,13,17");
  });
});
