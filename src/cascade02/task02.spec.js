import { solve } from "./task02.js";
import readInput from "../utils/read-input.js";

let inputs = readInput(import.meta.url);

describe("cascade02 task02", () => {
  test("it should work for examples", () => {
    expect(solve("U2 S4 L3 U2 R10", "0,0-0,10 7,5-7,5")).toEqual("6,5,8");
  });

  test("it should work for input", () => {
    expect(solve(...inputs)).toEqual("19,17,56");
  });
});
