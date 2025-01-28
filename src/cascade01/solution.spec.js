import { solve1, solve2, solve3, solve4, solve5 } from "./solution.js";
import { solve6, solve7 } from "./solution.js";
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
    expect(solve2(...inputs)).toEqual("170a239e18e1");
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
    expect(solve3(...inputs)).toEqual(36461);
  });
});

describe("cascade01 task04", () => {
  test("it should work for examples", () => {
    expect(solve4("abcde9876543210", 30)).toEqual("172,111,1486");
  });

  test("it should work for input", () => {
    expect(solve4(...inputs)).toEqual("3201,3126,2911");
  });
});

describe("cascade01 task05", () => {
  test("it should work for examples", () => {
    expect(solve5("a5fb04")).toEqual("6,29");
  });

  test("it should work for input", () => {
    expect(solve5(...inputs)).toEqual("162385,730417");
  });
});

describe("cascade01 task06", () => {
  test("it should work for examples", () => {
    expect(
      solve6(
        "a5fb04",
        "d9ba947a5e7648154fa8b5561cf0a2d95f439ff5747bbb8e430d5a965a5c80226a2cad03e23c40162f88638a560da98047ce",
      ),
    ).toEqual("17,279");
  });

  test("it should work for input", () => {
    // expect(solve6(...inputs)).toEqual("14884,6210354");
  });
});

describe("cascade01 task07", () => {
  test("it should work for examples", () => {
    expect(
      solve7(
        [[3], [4, 2, 2]],
        [5, 5, 10, 5, 7, 8, 6, 6].map(x => ({ producing: x })),
        3,
      ),
    ).toEqual(70);

    expect(
      solve7(
        "a5fb04",
        "d9ba947a5e7648154fa8b5561cf0a2d95f439ff5747bbb8e430d5a965a5c80226a2cad03e23c40162f88638a560da98047ce",
        3,
      ),
    ).toEqual(338);
  });

  test("it should work for input", () => {
    // expect(solve7(...inputs)).toEqual(267007482);
  });
});
