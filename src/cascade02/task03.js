function isWall(x, y, walls) {
  return walls.some(
    ([a, b]) =>
      (a.x === x && a.y <= y && y <= b.y) ||
      (a.y === y && a.x <= x && x <= b.x),
  );
}

export function solve(input, walls, treasures) {
  treasures = treasures.split(" ").map(t => {
    let [x, y, points] = t.split(/[,:]/).map(x => Number(x));
    return { x, y, points };
  });
  walls = walls.split(" ").map(x =>
    x.split("-").map(p => {
      let [x, y] = p.split(",").map(x => Number(x));
      return { x, y };
    }),
  );
  let start = { x: 1, y: 1 };
  // let bumps = 0;
  let points = 0;
  let lastPoint = 0;
  let currTime = 0;
  input
    .split(" ")
    .map(x => [x[0], parseInt(x.slice(1))])
    .reduce((acc, [dir, steps]) => {
      for (let i = 0; i < steps; i++) {
        let prev = { ...acc };
        if (dir === "U") acc.y++;
        if (dir === "D") acc.y--;
        if (dir === "L") acc.x--;
        if (dir === "R") acc.x++;
        if (isWall(acc.x, acc.y, walls)) {
          // bumps += steps - i;
          return prev;
        }
        currTime++;
        let treasure = treasures.find(t => t.x === acc.x && t.y === acc.y);
        if (treasure) {
          treasures.splice(treasures.indexOf(treasure), 1);
          points += treasure.points;
          lastPoint = currTime;
        }
      }
      return acc;
    }, start);

  return `${points},${lastPoint}`;
}
