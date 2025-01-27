export function solve1(input) {
  let chars = input.split("");
  let result = 0;
  for (let i = 1; i <= chars.length / 2; i++) {
    result += i * (parseInt(input[i - 1], 16) + parseInt(input.at(-i), 16));
  }
  return result;
}

export function solve2(input, slice = 1, times = 1000) {
  let parts = [
    [parseInt(input.slice(0, 5), 16)],
    [parseInt(input.slice(5, 10), 16)],
    [parseInt(input.slice(10, 15), 16)],
  ];
  for (let i = 0; i < times; i++) {
    parts.forEach(part => part.push((part.at(-1) * 421 + 37) % 3872873));
  }
  return parts
    .flatMap(part => part.slice(slice))
    .map(x => (x % 16).toString(16))
    .join("");
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
  input = input.split("");
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
      let next = root.digits.slice(i * 5, (i + 1) * 5).join("");
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
  if (input.length === 32) input = solve2(input).slice(0, 1000);
  return growRoot(input, energy).drops;
}

export function solve4(input, energy) {
  if (input.length === 32) input = solve2(input).slice(0, 1000);
  else input = input.padStart(800 + input.length, "X");
  return growRoot(input, energy).pot;
}
