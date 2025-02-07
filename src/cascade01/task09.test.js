import { describe, test, expect } from "vitest";
import { solve } from "./task09.js";
import readInputs from "../read-inputs.js";

let inputs = readInputs(import.meta.url);

describe("cascade01 task09", () => {
  test("it should work for examples", () => {
    expect(
      solve(
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
    expect(solve(...inputs)).toEqual("2aec5d50bad3315f844e22eaf8384ce1");
  });
});
