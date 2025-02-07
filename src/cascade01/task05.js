import { calcImage } from "./task02.js";

export function buildTree(input) {
  let limits = [
    [5, 6],
    [4, 7],
    [3, 8],
    [2, 9],
    [2, 9],
    [2, 9],
    [2, 9],
    [2, 9],
  ];
  let seed;
  let image = [];
  if (input.length === 32) seed = parseInt(input.slice(5, 10), 16);
  else {
    image = input.split("");
    limits = limits.slice(0, 2);
  }
  let level = 0;
  let current = 0;
  let counts = new Array(limits.length + 1).fill(0);
  let levels = new Array(limits.length).fill().map(() => []);
  counts[0] = 1;
  for (let i = 0; level < limits.length; i++) {
    if (image.length === i) {
      ({ image, seed } = calcImage(seed));
      i = 0;
    }
    let next = parseInt(image[i], 16);
    next = parseInt(next.toString(2).padStart(4, "0").slice(-3), 2) + 2;
    next = Math.min(Math.max(next, limits[level][0]), limits[level][1]);
    counts[level + 1] += next;
    levels[level].push(next);
    current++;
    if (current === counts[level]) {
      current = 0;
      level++;
    }
  }
  return { counts, levels };
}

export function solve(input) {
  const { counts } = buildTree(input);
  let forks = counts.slice(0, -1).reduce((a, b) => a + b);
  return `${forks},${counts.at(-1)}`;
}
