import { solve } from "./task03.js";
import readInput from "../utils/read-input.js";

let inputs = readInput(import.meta.url);

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
    expect(solve(...inputs)).toEqual("334,169");
  });
});
