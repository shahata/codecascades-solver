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

export function solve3(input, energy = 1024) {
  if (input.length === 32) input = solve2(input).slice(0, 1000);
  input = input.split("");
  let roots = [0, 1, 2, 3, 4]
    .map(i => ({ digits: input.slice(i * 200, (i + 1) * 200), energy }))
    .filter(root => root.digits.length > 0);
  let result = 0;
  for (let i = 0; i * 5 < 200; i++) {
    let drops = 0;
    let add = [];
    for (let root of roots) {
      let next = root.digits.slice(i * 5, (i + 1) * 5).join("");
      next = parseInt(next, 16).toString(2);
      // let distance = parseInt(next.slice(0, 7), 2);
      let drop = Math.min(root.energy, 5 + parseInt(next.slice(7, 10), 2));
      // let direction = parseInt(next.slice(10), 2);
      root.energy -= drop;
      drops += drop;
      if (root.energy >= 4) {
        let give = Math.floor(root.energy / 4);
        add.push({ ...root, energy: give });
        root.energy -= give;
      }
    }
    result += (i + 1) * drops;
    roots.push(...add);
  }
  return result;
}
