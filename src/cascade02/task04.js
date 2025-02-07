import { play } from "./game.js";

export function solve(input, walls, treasures, guards) {
  let result = play(input, walls, treasures, guards);
  return [result.caught, result.location].join(",");
}
