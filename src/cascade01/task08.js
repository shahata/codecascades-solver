import { growFlowers, dfs } from "./task07.js";

export function findPath(from, to) {
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

export function commandsChecksum(commands) {
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

export function solve(input, reservoir, amount) {
  let levels = input;
  if (input.length === 32) {
    amount = (parseInt(input.slice(15, 16), 16) % 8) + 5;
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
