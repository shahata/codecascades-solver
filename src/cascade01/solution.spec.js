import { solve, solve2 } from "./solution.js";
import readInputs from "../utils/read-inputs.js";

let inputs = readInputs(import.meta.url);

describe("cascade01 task01", () => {
  test("it should work for examples", () => {
    expect(solve("01ab2f")).toEqual(84);
  });

  test("it should work for input", () => {
    expect(solve(...inputs)).toEqual(1935);
  });
});

describe("cascade01 task02", () => {
  test("it should work for examples", () => {
    expect(solve2("123456789abcdef00000000000000000", 4)).toEqual(
      "67a498a2c910",
    );
  });

  test("it should work for input", () => {
    expect(solve2(...inputs)).toEqual("170a239e18e1");
  });
});
