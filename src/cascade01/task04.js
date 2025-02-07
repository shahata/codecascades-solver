import { solve as solve2 } from "./task02.js";
import { growRoot } from "./task03.js";

export function solve(input, energy) {
  if (input.length === 32) input = solve2(input, 0).slice(0, 1000);
  else input = input.padStart(800 + input.length, "X");
  return growRoot(input, energy).pot;
}
