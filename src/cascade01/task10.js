import { dfs, growFlowers } from "./task07.js";
import { findPath, commandsChecksum } from "./task08.js";
import { solve as solve9 } from "./task09.js";

function emptyReservoir(ant, backToRoot = false) {
  while (ant.position.parent) {
    ant.position = ant.position.parent;
    ant.commands.push("P");
    ant.time.push(5);
  }
  ant.commands.push("P", "V", "H", "D", ant.nectar);
  ant.time.push(15);

  if (ant.maleTree) {
    ant.time.push("QM", "WM", 2 + ant.nectar, "RM");
  } else {
    ant.time.push("QF", "WF", 2 + ant.nectar, "RF");
  }
  ant.nectar = 0;

  if (backToRoot) {
    ant.commands.push("H", "U", "U");
    ant.time.push(15);
  } else ant.position = null;
}

function takeNectar(ant, next) {
  let take = Math.min(next.nectar, ant.reservoir - ant.nectar);
  let path = findPath(ant.position, next);
  ant.commands.push(...path, "I", take);
  ant.time.push(path.filter(x => !Number.isInteger(x)).length * 5 + 2 + take);
  ant.position = next;
  ant.nectar += take;
  next.nectar -= take;
}

function switchTree(ant, root) {
  ant.commands.push("H", "U", "H", "U");
  ant.time.push(50);
  ant.maleTree = !ant.maleTree;
  ant.position = root;
}

function dumpPollens(ant, flevels, fdests) {
  emptyReservoir(ant);
  switchTree(ant, flevels[0][0]);
  for (let i = 0; i < ant.pollens.length; i++) {
    let next = fdests.find(x => x.i === ant.pollens[i]);
    while (next.nectar > 0) {
      if (ant.nectar === ant.reservoir) emptyReservoir(ant, true);
      takeNectar(ant, next);
    }
    ant.commands.push("S", i + 1, "D", 1, "S", 0);
    ant.time.push(6);
  }
  ant.pollens = [];
  emptyReservoir(ant);
}

export function solve(input, reservoir, seeds, extra, mnectar, fnectar) {
  let mlevels = input;
  let flevels = seeds;
  if (input.length === 32) {
    let male = input;
    let female = solve9(input, reservoir, seeds);
    let sex = parseInt(input.slice(15, 16), 16).toString(2).padStart(4, "0");
    if (sex[0] === "0") [male, female] = [female, male];
    mnectar = parseInt(male.slice(15, 16), 16).toString(2).padStart(4, "0");
    mnectar = 22 - parseInt(mnectar.slice(-3).split("").reverse().join(""), 2);
    fnectar = parseInt(female.slice(15, 16), 16).toString(2).padStart(4, "0");
    fnectar = 22 - parseInt(fnectar.slice(-3).split("").reverse().join(""), 2);
    mlevels = growFlowers(male);
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
    time: [],
    maleTree: true,
  }));
  let antsSorted = ants.toSorted((a, b) => b.reservoir - a.reservoir);
  let time = 0;
  let mQueue = [];
  let fQueue = [];
  let done = false;
  while (!done) {
    done = true;
    for (let ant of antsSorted) {
      if (ant.time.length > 0) {
        if (ant.time[0] === "RM") mQueue.shift().ant.time.shift();
        if (ant.time[0] === "RF") fQueue.shift().ant.time.shift();
        if (ant.time.length === 0) ant.finished = time;
      }
    }
    for (let ant of antsSorted) {
      if (ant.time.length === 0) {
        if (mdests.length > 0) {
          let next = mdests.shift();
          if (!ant.maleTree) switchTree(ant, mlevels[0][0]);
          else if (!ant.position) {
            ant.position = mlevels[0][0];
            ant.commands.push("H", "U", "U");
            ant.time.push(15);
          }
          while (next.nectar > 0) {
            if (ant.nectar === ant.reservoir) emptyReservoir(ant, true);
            takeNectar(ant, next);
          }
          ant.pollens.push(next.i);
          ant.commands.push("S", ant.pollens.length, "I", 1, "S", 0);
          ant.time.push(6);
          if (ant.pollens.length === 5) dumpPollens(ant, flevels, fdests);
          else if (ant.nectar === ant.reservoir) emptyReservoir(ant);
        } else if (ant.maleTree) dumpPollens(ant, flevels, fdests);
      }
      if (ant.time.length > 0) {
        done = false;
        if (ant.time[0] === "QM") {
          mQueue.push({ ant, time });
          ant.time.shift();
        }
        if (ant.time[0] === "QF") {
          fQueue.push({ ant, time });
          ant.time.shift();
        }
        if (ant.time[0] === "WM") {
          if (mQueue[0].ant !== ant) continue;
          ant.time.shift();
        }
        if (ant.time[0] === "WF") {
          if (fQueue[0].ant !== ant) continue;
          ant.time.shift();
        }
        ant.time[0]--;
        if (ant.time[0] === 0) ant.time.shift();
      }
    }
    time++;
  }
  return ants
    .map(ant => `${commandsChecksum(ant.commands)}:${ant.finished}`)
    .join(",");
}
