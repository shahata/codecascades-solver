import { play } from "./game.js";

export function solve(input, walls, treasures, guards, games) {
  games = games.split("\n");
  let results = games
    .map((game, i) => ({ i: i + 1, ...play(game, walls, treasures, guards) }))
    .filter(x => !x.caught)
    .sort((a, b) => b.score - a.score || a.time - b.time);
  let { i, location, score, time } = results[0];
  return [i, location, score, time].join(",");
}
