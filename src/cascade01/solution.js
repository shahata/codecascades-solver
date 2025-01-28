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

export function solve7(input, image, flowers = 100) {
  let { counts, levels } = buildTree(input);
  let { leaves } = calcLeaves(counts.at(-1), input, image);
  if (Array.isArray(input)) levels = input;
  if (Array.isArray(image)) leaves = image;
  levels.push(
    leaves.map((x, i) => ({
      id: i + 1,
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
      levels[i][j] = { id: j + 1, energy, children, flowers: 0 };
    }
  }
  levels[0][0].flowers = flowers;
  for (let i = 0; i < levels.length; i++) {
    for (let j = 0; j < levels[i].length; j++) {
      if (!levels[i][j].children) continue;
      if (levels[i][j].flowers < 2) continue;
      for (let k = 0; k < levels[i][j].flowers; k++) {
        levels[i][j].children.sort(
          (a, b) =>
            b.energy / (b.flowers + 1) - a.energy / (a.flowers + 1) ||
            a.flowers - b.flowers ||
            a.id - b.id,
        );
        levels[i][j].children[0].flowers++;
      }
    }
  }
  let sum = 0;
  let k = 1;
  for (let i = levels.length - 1; i >= 0; i--) {
    for (let j = 0; j < levels[i].length; j++) {
      if (levels[i][j].flowers === 1) {
        sum += levels[i][j].energy * k++;
      }
    }
  }
  return sum;
}

export function* solve(input) {
  yield solve1(input);
  yield solve2(input);
  yield solve3(input);
  yield solve4(input);
  yield solve5(input);
  yield solve6(input);
  return solve7(input);
}
