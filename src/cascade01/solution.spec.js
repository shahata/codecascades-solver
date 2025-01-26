import { solve1, solve2, solve3 } from "./solution.js";
import readInputs from "../utils/read-inputs.js";

let inputs = readInputs(import.meta.url);

describe("cascade01 task01", () => {
  test("it should work for examples", () => {
    expect(solve1("01ab2f")).toEqual(84);
  });

  test("it should work for input", () => {
    expect(solve1(...inputs)).toEqual(1935);
  });
});

describe("cascade01 task02", () => {
  test("it should work for examples", () => {
    expect(solve2("123456789abcdef00000000000000000", -4, 4)).toEqual(
      "67a498a2c910",
    );
  });

  test("it should work for input", () => {
    expect(solve2(...inputs, -4)).toEqual("170a239e18e1");
  });
});

describe("cascade01 task03", () => {
  test("it should work for examples", () => {
    expect(
      solve3(
        new Array(5).fill("aa155aa555aa955aad55ab155ab555ab955abd55").join(""),
        20,
      ),
    ).toEqual(41);
    expect(
      solve3(
        new Array(5).fill("aa155aa555aa955aad55ab155ab555ab955abd55").join(""),
      ),
    ).toEqual(7209);
  });

  test("it should work for input", () => {
    expect(solve3(...inputs)).toEqual(36111);
  });
});
