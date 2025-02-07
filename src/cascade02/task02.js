import { play } from "./game.js";

export function solve(input, walls) {
  let result = play(input, walls);
  return [result.location, result.bumps].join(",");
}
