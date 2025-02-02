import { solve1, solve2, solve3, solve4, solve5 } from "./solution.js";
import { solve6, solve7, solve8, solve9, solve10 } from "./solution.js";
import { growFlowers } from "./solution.js";
import readInputs from "../utils/read-inputs.js";

let inputs = readInputs(import.meta.url);

describe("cascade01 task01", () => {
  test("it should work for examples", () => {
    expect(solve1("01ab2f")).toEqual(84);
  });

  test("it should work for input", () => {
    expect(solve1(...inputs.slice(0, 1))).toEqual(1935);
  });
});

describe("cascade01 task02", () => {
  test("it should work for examples", () => {
    expect(solve2("123456789abcdef00000000000000000", -4, 4)).toEqual(
      "67a498a2c910",
    );
  });

  test("it should work for input", () => {
    expect(solve2(...inputs.slice(0, 1))).toEqual("170a239e18e1");
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
    expect(solve3(...inputs.slice(0, 1))).toEqual(36461);
  });
});

describe("cascade01 task04", () => {
  test("it should work for examples", () => {
    expect(solve4("abcde9876543210", 30)).toEqual("172,111,1486");
  });

  test("it should work for input", () => {
    expect(solve4(...inputs.slice(0, 1))).toEqual("3201,3126,2911");
  });
});

describe("cascade01 task05", () => {
  test("it should work for examples", () => {
    expect(solve5("a5fb04")).toEqual("6,29");
  });

  test("it should work for input", () => {
    expect(solve5(...inputs.slice(0, 1))).toEqual("162385,730417");
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
    expect(solve6(...inputs.slice(0, 1))).toEqual("14884,6210354");
  });
});

describe("cascade01 task07", () => {
  test("it should work for examples", () => {
    expect(solve7([[3], [4, 2, 2]], [5, 5, 10, 5, 7, 8, 6, 6], 3)).toEqual(70);

    expect(
      solve7(
        "a5fb04",
        "d9ba947a5e7648154fa8b5561cf0a2d95f439ff5747bbb8e430d5a965a5c80226a2cad03e23c40162f88638a560da98047ce",
        3,
      ),
    ).toEqual(338);
  });

  test("it should work for input", () => {
    // expect(solve7(...inputs.slice(0, 1))).toEqual(228807506);
  });
});

describe("cascade01 task08", () => {
  test("it should work for examples", () => {
    expect(
      solve8(
        growFlowers([[3], [4, 2, 2]], [5, 10, 5, 5, 7, 8, 6, 6], 3),
        19,
        10,
      ),
    ).toEqual(2050);
  });

  test("it should work for input", () => {
    // expect(solve8(...inputs.slice(0, 2))).toEqual(1588897);
  });
});

describe("cascade01 task09", () => {
  test("it should work for examples", () => {
    expect(
      solve9(
        "d50f4dacfb40ae259769ed8ebe42308d",
        0,
        [
          "c12370e36c0d95695735776018cf8cf5",
          "c502c54e75000be342bea0399d4e1ca4",
          "7bf59dba2b42341b3a5f5746e2841674",
          "81ffa21c02f5788b29725dab0828626f",
          "ea7ad7ad2b27b80e99d3a13c1d12045e",
          "44bfed2b8606c0af3d98373001016a0a",
          "3de23046fcc5f3abc212bf7ba34e5b3a",
          "b1ffdb811127689147ac95e51991059c",
        ].join("\n"),
        3,
      ),
    ).toEqual("7bf59dba2b42341b3a5f5746e2841674");
  });

  test("it should work for input", () => {
    expect(solve9(...inputs.slice(0, 3))).toEqual(
      "2aec5d50bad3315f844e22eaf8384ce1",
    );
  });
});

describe("cascade01 task10", () => {
  test("it should work for examples", () => {
    expect(
      solve10(
        growFlowers([[3], [4, 2, 2]], [5, 10, 5, 5, 7, 8, 6, 6], 3),
        "17",
        growFlowers([[3], [2, 2, 4]], [7, 8, 6, 6, 5, 10, 5, 5], 3),
        "19",
        10,
        11,
      ),
    ).toEqual("3364:197,15279:373");
  });

  test("it should work for input", () => {
    // expect(solve10(...inputs.slice(0, 4))).toEqual(
    //   "2893533:5575,2799220:5515,2886421:5509,2474862:5457",
    // );
    // 2872813:5853,2797189:5715,2859673:5717,2477077:5726
    // 2815551:5823,2733197:5729,2527011:5559,2626023:5812
    // 2539254:5207,2320925:5135,2813816:5455,2228048:5224
  });
});
