import { buildTree } from "./task05.js";
import { calcLeaves } from "./task06.js";

function all(flowers, count) {
  if (count === 1) return [[flowers]];
  let result = [];
  for (let i = flowers; i >= 0; i--) {
    all(flowers - i, count - 1).forEach(x => result.push([i, ...x]));
  }
  return result;
}

function test(option, children) {
  let after = children.map((x, i) =>
    option[i] === 0 ? 0 : x.energy / option[i],
  );
  let min = Math.min(...after.filter(x => x > 0));
  let total = after.reduce((sum, x) => sum + x, 0);
  return { min, total, option };
}

function best(children, flowers) {
  let options = all(flowers, children.length);
  let results = options.map(option => test(option, children));
  let max = results.reduce((max, x) => Math.max(max, x.min), 0);
  results = results.filter(x => x.min === max);
  max = results.reduce((max, x) => Math.max(max, x.total), 0);
  results = results.filter(x => x.total === max);
  return results[0].option;
}

export function growFlowers(input, image, flowers = 100) {
  let counts, levels, leaves;
  if (Array.isArray(input)) {
    levels = input;
    leaves = image.map(x => ({ producing: x, required: 0 }));
  } else {
    ({ counts, levels } = buildTree(input));
    ({ leaves } = calcLeaves(counts.at(-1), input, image));
  }
  levels.push(
    leaves.map(x => ({
      energy: x.producing,
      children: null,
      flowers: 0,
    })),
  );
  for (let i = levels.length - 2; i >= 0; i--) {
    let current = 0;
    for (let j = 0; j < levels[i].length; j++) {
      current += levels[i][j];
      let children = levels[i + 1].slice(current - levels[i][j], current);
      let energy = children.reduce((sum, x) => sum + x.energy, 0);
      children.forEach((x, i) => (x.id = i));
      levels[i][j] = { energy, children, flowers: 0 };
    }
  }
  levels[0][0].flowers = flowers;
  for (let i = 0; i < levels.length; i++) {
    for (let j = 0; j < levels[i].length; j++) {
      if (!levels[i][j].children) continue;
      if (levels[i][j].flowers < 2) continue;
      let option = best(levels[i][j].children, levels[i][j].flowers);
      option.forEach((x, k) => (levels[i][j].children[k].flowers = x));
    }
  }
  return levels;
}

export function dfs(node) {
  if (node.flowers === 1) return [node];
  if (!node.children) return [];
  let result = [];
  for (let i = 0; i < node.children.length; i++) {
    node.children[i].parent = node;
    result = result.concat(dfs(node.children[i]));
  }
  return result;
}

export function solve(input, image, flowers = 100) {
  let levels = growFlowers(input, image, flowers);
  let result = dfs(levels[0][0]).map(x => x.energy);
  return result.map((x, i) => x * (i + 1)).reduce((a, b) => a + b, 0);
}
