import { solve as solve4 } from "./task04.js";
import { solve as solve6 } from "./task06.js";

export function solve(input, reservoir, seeds, best = 20) {
  let sex = parseInt(input.slice(15, 16), 16).toString(2);
  sex = sex.padStart(4, "0").slice(0, 1);
  return seeds
    .split("\n")
    .filter(x => {
      let sex2 = parseInt(x.slice(15, 16), 16).toString(2);
      sex2 = sex2.padStart(4, "0").slice(0, 1);
      return sex !== sex2;
    })
    .map(x => {
      let volume = solve4(x)
        .split(",")
        .map(x => parseInt(x))
        .reduce((a, b) => a * b, 1);
      return { volume, seed: x };
    })
    .sort((a, b) => a.volume - b.volume || a.seed.localeCompare(b.seed))
    .slice(0, best)
    .map(x => {
      let time = +solve6(x.seed).split(",")[0];
      return { time, seed: x.seed, volume: x.volume };
    })
    .sort((a, b) => a.time - b.time || a.seed.localeCompare(b.seed))
    .at(0).seed;
}
