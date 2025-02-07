import { play } from "./game.js";

export function solve(input) {
  let result = play(input);
  return result.location;
}
