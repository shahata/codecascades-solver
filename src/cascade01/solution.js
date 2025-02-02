import { cache } from "./cache.js";

export function solve1(input) {
  let chars = input.split("");
  let result = 0;
  for (let i = 1; i <= chars.length / 2; i++) {
    result += i * (parseInt(input[i - 1], 16) + parseInt(input.at(-i), 16));
  }
  return result;
}

function calcImage(seed, times = 1000) {
  let sequence = [seed];
  for (let i = 0; i < times; i++) {
    sequence.push((sequence.at(-1) * 421 + 37) % 3872873);
  }
  sequence = sequence.slice(1);
  return {
    seed: sequence.at(-1),
    image: sequence.map(x => (x % 16).toString(16)).join(""),
  };
}

export function solve2(input, slice = -4, times = 1000) {
  let parts = [
    [parseInt(input.slice(0, 5), 16)],
    [parseInt(input.slice(5, 10), 16)],
    [parseInt(input.slice(10, 15), 16)],
  ];
  return parts.map(seed => calcImage(seed, times).image.slice(slice)).join("");
}

let angles = [
  [90, 180],
  [90, 0],
  [90, 90],
  [90, 270],
  [180, 0],
];
let sin = x => Math.sin(x * (Math.PI / 180));
let cos = x => Math.cos(x * (Math.PI / 180));
function growRoot(input, energy = 1024) {
  let roots = [0, 1, 2, 3, 4]
    .map(i => ({
      digits: input.slice(i * 200, (i + 1) * 200),
      position: [0, 0, -200 * (i + 1)],
      angles: [...angles[i]],
      energy,
    }))
    .filter(root => root.digits.length > 0 && root.digits[0] !== "X");
  let max = [-Infinity, -Infinity, 0];
  let min = [Infinity, Infinity, 0];
  let result = 0;
  for (let i = 0; i * 5 < 200; i++) {
    let drops = 0;
    let add = [];
    for (let root of roots) {
      if (root.energy === 0 || i * 5 > root.digits.length) continue;
      let next = root.digits.slice(i * 5, (i + 1) * 5);
      next = parseInt(next, 16).toString(2).padStart(20, "0");
      let distance = 100 + parseInt(next.slice(0, 7), 2);
      let drop = Math.min(root.energy, 5 + parseInt(next.slice(7, 10), 2));
      let A1 = (10 + parseInt(next.slice(11, 15), 2)) * (+next[10] ? -1 : 1);
      let A2 = (10 + parseInt(next.slice(16, 20), 2)) * (+next[15] ? -1 : 1);
      let [a, b] = root.angles;
      root.position[0] += Math.round(distance * sin(a) * cos(b));
      root.position[1] += Math.round(distance * sin(a) * sin(b));
      root.position[2] += Math.min(0, Math.round(distance * cos(a)));
      max = max.map((m, i) => Math.max(m, root.position[i]));
      min = min.map((m, i) => Math.min(m, root.position[i]));
      root.energy -= drop;
      drops += drop;
      if (root.energy >= 4) {
        let give = Math.floor(root.energy / 4);
        add.push({
          digits: root.digits,
          position: [...root.position],
          angles: [root.angles[0] - 2 * A1, root.angles[1] - 2 * A2],
          energy: give,
        });
        root.energy -= give;
        root.angles[0] += A1;
        root.angles[1] += A2;
      }
    }
    result += (i + 1) * drops;
    roots.push(...add);
  }
  return { drops: result, pot: max.map((m, i) => m - min[i]).join(",") };
}

export function solve3(input, energy) {
  if (input.length === 32) input = solve2(input, 0).slice(0, 1000);
  return growRoot(input, energy).drops;
}

export function solve4(input, energy) {
  if (input.length === 32) input = solve2(input, 0).slice(0, 1000);
  else input = input.padStart(800 + input.length, "X");
  return growRoot(input, energy).pot;
}

function buildTree(input) {
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
  let image = "";
  if (input.length === 32) seed = parseInt(input.slice(5, 10), 16);
  else {
    image = input;
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

export function solve5(input) {
  const { counts } = buildTree(input);
  let forks = counts.slice(0, -1).reduce((a, b) => a + b);
  return `${forks},${counts.at(-1)}`;
}

function calcLeaves(count, input, image) {
  let leaves = [];
  let seed = parseInt(input.slice(10, 15), 16);
  let leafDigits = image ? 4 : 999;
  let energyIncrement = image ? 250 : 1000;
  if (!image) ({ image, seed } = calcImage(seed, count + leafDigits + 2));
  energyIncrement -= parseInt(image.slice(0, 2), 16);
  for (let i = 0; i < count; i++) {
    let required = image.slice(2 + i, 2 + i + leafDigits);
    required = required.split("").map(x => parseInt(x, 16));
    required = required.reduce((a, b) => a + b);
    let producing = parseInt(image[2 + i + leafDigits], 16) + 1;
    leaves.push({ required, producing });
  }
  return { leaves, energyIncrement };
}

export function solve6(input, image) {
  if (cache[input]) return cache[input];
  let growTime = image ? 4 : 1000;
  let count = +solve5(input).split(",").at(-1);
  let { leaves, energyIncrement } = calcLeaves(count, input, image);
  leaves = leaves.sort(
    (a, b) => a.required - b.required || b.producing - a.producing,
  );
  let inc = [];
  let time = 0;
  let energy = 0;
  while (leaves.length > 0) {
    let next = leaves.shift();
    while (next.required > energy) {
      let x = Math.ceil((next.required - energy) / energyIncrement);
      let min = Math.min(x, inc[0] ? inc[0].time - time : Infinity);
      time += min;
      energy += energyIncrement * min;
      while (inc[0]?.time === time) energyIncrement += inc.shift().num;
    }
    energy -= next.required;
    inc.push({ time: time + growTime, num: next.producing });
  }
  inc.forEach(x => {
    energyIncrement += x.num;
    time = x.time;
  });
  return `${time},${energyIncrement}`;
}

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
  let { counts, levels } = buildTree(input);
  let { leaves } = calcLeaves(counts.at(-1), input, image);
  if (Array.isArray(input)) levels = input;
  if (Array.isArray(image))
    leaves = image.map(x => ({ producing: x, required: 0 }));
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
      // for (let k = 0; k < levels[i][j].flowers; k++) {
      //   levels[i][j].children.sort(
      //     (a, b) =>
      //       b.energy / (b.flowers + 1) - a.energy / (a.flowers + 1) ||
      //       a.flowers - b.flowers ||
      //       a.id - b.id,
      //   );
      //   levels[i][j].children[0].flowers++;
      // }
    }
  }
  return levels;
}

function dfs(node) {
  if (node.flowers === 1) return [node];
  if (!node.children) return [];
  let result = [];
  for (let i = 0; i < node.children.length; i++) {
    node.children[i].parent = node;
    result = result.concat(dfs(node.children[i]));
  }
  return result;
}

export function solve7(input, image, flowers = 100) {
  let levels = growFlowers(input, image, flowers);
  let result = dfs(levels[0][0]).map(x => x.energy);
  return result.map((x, i) => x * (i + 1)).reduce((a, b) => a + b, 0);
}

function findPath(from, to) {
  let a = [];
  let b = [];
  while (from) {
    a.push(from);
    from = from.parent;
  }
  while (to) {
    b.push(to);
    to = to.parent;
  }
  while (a.at(-1) === b.at(-1)) {
    a.pop();
    b.pop();
  }
  return a.map(() => "P").concat(b.reverse().flatMap(x => ["C", x.id]));
}

function commandsChecksum(commands) {
  commands = commands.flatMap((x, i) => {
    let s = x => {
      x = x.toString(2).padStart(6, "0");
      return [parseInt(x.slice(0, 3), 2), parseInt(x.slice(3), 2)];
    };
    if (x === "U") return 0;
    if (x === "H") return 1;
    if (x === "P") return 2;
    if (x === "C") return 3;
    if (x === "I") return 4;
    if (x === "D") return 5;
    if (x === "S") return 6;
    if (x === "V") return 7;
    if (commands[i - 1] === "C") return s(x);
    if (commands[i - 1] === "S") return s(x)[1];
    return s(x - 1);
  });
  return commands.map((x, i) => x * (i + 1)).reduce((a, b) => a + b, 0);
}

export function solve8(input, reservoir, amount) {
  let levels = input;
  if (input.length === 32) {
    amount = parseInt(input.slice(15, 16), 16);
    amount = parseInt(amount.toString(2).padStart(4, "0").slice(-3), 2) + 5;
    levels = growFlowers(input);
  }
  reservoir = +reservoir;
  let destinations = dfs(levels[0][0]).map(x => ({ ...x, need: amount }));
  let needed = destinations.length * amount - reservoir;
  let current = { position: levels[0][0], left: reservoir };
  let commands = ["I", reservoir, "H", "U"];
  while (destinations.length > 0) {
    let next = destinations.shift();
    while (next.need > 0) {
      if (current.left === 0) {
        while (current.position.parent) {
          current.position = current.position.parent;
          commands.push("P");
        }
        let take = Math.min(needed, reservoir);
        commands.push("P", "H", "I", take, "H", "U");
        current.left += take;
        needed -= take;
      }
      let give = Math.min(next.need, current.left);
      commands.push(...findPath(current.position, next), "D", give);
      current.position = next;
      current.left -= give;
      next.need -= give;
    }
  }
  while (current.position.parent) {
    current.position = current.position.parent;
    commands.push("P");
  }
  commands.push("P", "H");
  return commandsChecksum(commands);
}

export function solve9(input, reservoir, seeds, best = 20) {
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

let locks = [];
function resolveConflicts(count = 0) {
  // let found = false;
  for (let lock of locks) {
    let before = locks.find(
      x =>
        x !== lock &&
        x.maleTree === lock.maleTree &&
        ((x.start < lock.start && x.end > lock.start) ||
          (x.start === lock.start && x.ant.reservoir > lock.ant.reservoir)),
    );
    if (before) {
      // found = true;
      let diff = before.end - lock.start;
      lock.ant.time += diff;
      locks
        .filter(x => x.ant === lock.ant && x.start >= lock.start)
        .forEach(x => {
          x.start += diff;
          x.end += diff;
        });
      resolveConflicts(count + 1);
      break;
    }
  }
  // if (!found) console.log(count ? `Fixed ${count} conflicts` : "No conflicts");
}

function emptyReservoir(ant, backToRoot = false) {
  while (ant.position.parent) {
    ant.position = ant.position.parent;
    ant.commands.push("P");
    ant.time += 5;
  }
  ant.commands.push("P", "V", "H", "D", ant.nectar);
  ant.time += 15;

  locks.push({
    ant,
    maleTree: ant.maleTree,
    start: ant.time,
    end: ant.time + 2 + ant.nectar,
  });
  resolveConflicts();

  ant.time += 2 + ant.nectar;
  ant.nectar = 0;

  if (backToRoot) {
    ant.commands.push("H", "U", "U");
    ant.time += 15;
  } else ant.position = null;
}

function takeNectar(ant, next) {
  let take = Math.min(next.nectar, ant.reservoir - ant.nectar);
  let path = findPath(ant.position, next);
  ant.commands.push(...path, "I", take);
  ant.time += path.filter(x => !Number.isInteger(x)).length * 5 + 2 + take;
  ant.position = next;
  ant.nectar += take;
  next.nectar -= take;
}

function switchTree(ant, root) {
  ant.commands.push("H", "U", "H", "U");
  ant.time += 50;
  ant.maleTree = !ant.maleTree;
  ant.position = root;
}

function dumpPollens(ant, flevels, fdests) {
  emptyReservoir(ant);
  switchTree(ant, flevels[0][0]);
  for (let i = 0; i < ant.pollens.length; i++) {
    let pollen = ant.pollens[i];
    let next = fdests.find(x => x.i === pollen);
    fdests = fdests.filter(x => x.i !== pollen);
    while (next.nectar > 0) {
      if (ant.nectar === ant.reservoir) emptyReservoir(ant, true);
      takeNectar(ant, next);
    }
    ant.commands.push("S", i + 1, "D", 1, "S", 0);
    ant.time += 6;
  }
  ant.pollens = [];
  emptyReservoir(ant);
}

export function solve10(input, reservoir, seeds, extra, mnectar, fnectar) {
  let mlevels = input;
  let flevels = seeds;
  if (input.length === 32) {
    let female = solve9(input, reservoir, seeds);
    mnectar = parseInt(input.slice(15, 16), 16).toString(2).padStart(4, "0");
    mnectar = 22 - parseInt(mnectar.slice(-3).split("").reverse().join(""), 2);
    fnectar = parseInt(input.slice(15, 16), 16).toString(2).padStart(4, "0");
    fnectar = 22 - parseInt(fnectar.slice(-3).split("").reverse().join(""), 2);
    mlevels = growFlowers(input);
    flevels = growFlowers(female);
  }
  reservoir = [+reservoir, ...extra.split(",").map(x => +x)];
  let mdests = dfs(mlevels[0][0]).map((x, i) => ({ ...x, nectar: mnectar, i }));
  let fdests = dfs(flevels[0][0]).map((x, i) => ({ ...x, nectar: fnectar, i }));
  let ants = reservoir.map(x => ({
    position: null,
    reservoir: x,
    nectar: 0,
    pollens: [],
    commands: [],
    time: 0,
    maleTree: true,
  }));
  while (mdests.length > 0) {
    let next = mdests.shift();
    let ant = ants.toSorted(
      (a, b) => a.time - b.time || b.reservoir - a.reservoir,
    )[0];
    if (!ant.maleTree) switchTree(ant, mlevels[0][0]);
    if (!ant.position) {
      ant.position = mlevels[0][0];
      ant.commands.push("H", "U", "U");
      ant.time += 15;
    }
    while (next.nectar > 0) {
      if (ant.nectar === ant.reservoir) emptyReservoir(ant, true);
      takeNectar(ant, next);
    }
    ant.pollens.push(next.i);
    ant.commands.push("S", ant.pollens.length, "I", 1, "S", 0);
    ant.time += 6;
    if (ant.pollens.length === 5) dumpPollens(ant, flevels, fdests);
    else if (ant.nectar === ant.reservoir) emptyReservoir(ant);
  }
  ants
    .filter(ant => ant.maleTree)
    .forEach(ant => dumpPollens(ant, flevels, fdests));

  return ants
    .map(ant => `${commandsChecksum(ant.commands)}:${ant.time}`)
    .join(",");
}

export function* solve(input, reservoir, seeds, extra) {
  if (extra) return solve10(input, reservoir, seeds, extra);
  if (seeds) return solve9(input, reservoir, seeds);
  if (reservoir) return solve8(input, reservoir);
  yield solve1(input);
  yield solve2(input);
  yield solve3(input);
  yield solve4(input);
  yield solve5(input);
  yield solve6(input);
  return solve7(input);
}
