import { solve as solve5 } from "./task05.js";
import { calcImage } from "./task02.js";
import { cache } from "./cache.js";

export function calcLeaves(count, input, image) {
  let leaves = [];
  let seed = parseInt(input.slice(10, 15), 16);
  let leafDigits = image ? 4 : 999;
  let energyIncrement = image ? 250 : 1000;
  if (!image) ({ image, seed } = calcImage(seed, count + leafDigits + 2));
  energyIncrement -= parseInt(image.slice(0, 2).join(""), 16);
  image = image.map(x => parseInt(x, 16));
  for (let i = 0; i < count; i++) {
    let required = image.slice(2 + i, 2 + i + leafDigits);
    required = required.reduce((a, b) => a + b);
    let producing = image[2 + i + leafDigits] + 1;
    leaves.push({ required, producing });
  }
  return { leaves, energyIncrement };
}

export function solve(input, image) {
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
