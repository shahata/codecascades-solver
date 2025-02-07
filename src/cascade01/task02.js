export function calcImage(seed, times = 1000) {
  let sequence = [seed];
  for (let i = 0; i < times; i++) {
    sequence.push((sequence.at(-1) * 421 + 37) % 3872873);
  }
  sequence = sequence.slice(1);
  return {
    seed: sequence.at(-1),
    image: sequence.map(x => (x % 16).toString(16)),
  };
}

export function solve(input, slice = -4, times = 1000) {
  let parts = [
    [parseInt(input.slice(0, 5), 16)],
    [parseInt(input.slice(5, 10), 16)],
    [parseInt(input.slice(10, 15), 16)],
  ];
  return parts
    .flatMap(seed => calcImage(seed, times).image.slice(slice))
    .join("");
}
