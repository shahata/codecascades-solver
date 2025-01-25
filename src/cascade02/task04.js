function isWall(x, y, walls) {
  return walls.some(
    ([a, b]) =>
      (a.x === x && a.y <= y && y <= b.y) ||
      (a.y === y && a.x <= x && x <= b.x),
  );
}

function inSight(guard, acc, walls) {
  if (
    guard.x === acc.x &&
    !walls.some(
      ([a, b]) =>
        (a.x - acc.x) * (b.x - guard.x) <= 0 &&
        (a.y - acc.y) * (b.y - guard.y) <= 0,
    )
  ) {
    return guard.y < acc.y ? "U" : "D";
  }
  if (
    guard.y === acc.y &&
    !walls.some(
      ([a, b]) =>
        (a.x - acc.x) * (b.x - guard.x) <= 0 &&
        (a.y - acc.y) * (b.y - guard.y) <= 0,
    )
  ) {
    return guard.x < acc.x ? "R" : "L";
  }
  return guard.dir;
}

export function solve(input, walls, treasures, guards) {
  guards = guards.split(" ").map(g => {
    let [x, y] = g.split(",").map(x => Number(x));
    return { x, y, dir: "S", wait: false };
  });
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
  // let points = 0;
  // let lastPoint = 0;
  let currTime = 0;
  let endGame;
  input
    .split(" ")
    .map(x => [x[0], parseInt(x.slice(1))])
    .reduce((acc, [dir, steps]) => {
      for (let i = 0; i < steps; i++) {
        if (endGame) return acc;
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
          // points += treasure.points;
          // lastPoint = currTime;
        }
        guards.forEach(guard => {
          // let prev = { ...guard };
          if (
            guard.x === acc.x &&
            guard.y === acc.y &&
            (!guard.wait ||
              guard.dir + dir === "RL" ||
              guard.dir + dir === "UD")
          ) {
            endGame = endGame || `${currTime},${acc.x},${acc.y}`;
            return;
          }
          if (guard.dir === "S") {
            guard.dir = inSight(guard, acc, walls);
            return;
          } else {
            guard.wait = !guard.wait;
            if (guard.wait) return;
          }
          if (guard.dir === "U") guard.y++;
          if (guard.dir === "D") guard.y--;
          if (guard.dir === "L") guard.x--;
          if (guard.dir === "R") guard.x++;
          let open = [
            { x: guard.x + 1, y: guard.y, dir: "H" },
            { x: guard.x - 1, y: guard.y, dir: "H" },
            { x: guard.x, y: guard.y + 1, dir: "V" },
            { x: guard.x, y: guard.y - 1, dir: "V" },
          ]
            .filter(n => !isWall(n.x, n.y, walls))
            .map(n => n.dir)
            .join("");
          if (open !== "HH" && open !== "VV") guard.dir = "S";
          guard.dir = inSight(guard, acc, walls);

          if (guard.x === acc.x && guard.y === acc.y) {
            endGame = endGame || `${currTime},${acc.x},${acc.y}`;
            return;
          }
        });
      }
      return acc;
    }, start);

  return endGame;
}
