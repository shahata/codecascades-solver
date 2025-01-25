export function solve(input) {
  let start = { x: 1, y: 1 };
  let end = input
    .split(" ")
    .map(x => [x[0], parseInt(x.slice(1))])
    .reduce((acc, [dir, steps]) => {
      if (dir === "U") acc.y += steps;
      if (dir === "D") acc.y -= steps;
      if (dir === "L") acc.x -= steps;
      if (dir === "R") acc.x += steps;
      return acc;
    }, start);

  return `${end.x},${end.y}`;
}
