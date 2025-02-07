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

export function play(input, walls, treasures, guards) {
  guards =
    guards?.split(" ").map(g => {
      let [x, y] = g.split(",").map(x => Number(x));
      return { x, y, dir: "S", wait: false };
    }) || [];
  treasures =
    treasures?.split(" ").map(t => {
      let [x, y, points] = t.split(/[,:]/).map(x => Number(x));
      return { x, y, points };
    }) || [];
  walls =
    walls?.split(" ").map(x =>
      x.split("-").map(p => {
        let [x, y] = p.split(",").map(x => Number(x));
        return { x, y };
      }),
    ) || [];
  let player = { x: 1, y: 1 };
  let bumps = 0;
  let score = 0;
  let lastPoint = 0;
  let currTime = 0;
  let caught;
  let actions = input.split(" ").map(x => [x[0], parseInt(x.slice(1))]);
  for (let [dir, steps] of actions) {
    for (let i = 0; i < steps; i++) {
      if (caught) break;
      let prev = { ...player };
      if (dir === "U") player.y++;
      if (dir === "D") player.y--;
      if (dir === "L") player.x--;
      if (dir === "R") player.x++;
      if (isWall(player.x, player.y, walls)) {
        bumps += steps - i;
        player = prev;
        break;
      }
      currTime++;
      let treasure = treasures.find(t => t.x === player.x && t.y === player.y);
      if (treasure) {
        treasures.splice(treasures.indexOf(treasure), 1);
        score += treasure.points;
        lastPoint = currTime;
      }
      for (let guard of guards) {
        if (
          (guard.x - prev.x) * (guard.x - player.x) <= 0 &&
          (guard.y - prev.y) * (guard.y - player.y) <= 0
        ) {
          caught = currTime;
          break;
        }
        if (guard.dir === "S") {
          guard.dir = inSight(guard, player, walls);
          continue;
        } else {
          guard.wait = !guard.wait;
          if (guard.wait) continue;
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
        guard.dir = inSight(guard, player, walls);

        if (guard.x === player.x && guard.y === player.y) {
          caught = currTime;
          break;
        }
      }
    }
  }

  return {
    caught,
    bumps,
    location: `${player.x},${player.y}`,
    score,
    time: lastPoint,
  };
}
