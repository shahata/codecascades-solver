import { play } from "./game.js";

export function solve(input, walls, treasures) {
  let result = play(input, walls, treasures);
  return [result.score, result.time].join(",");
}
