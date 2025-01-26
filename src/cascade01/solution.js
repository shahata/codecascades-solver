export function solve(input) {
  let chars = input.split("");
  let result = 0;
  for (let i = 1; i <= chars.length / 2; i++) {
    result += i * (parseInt(input[i - 1], 16) + parseInt(input.at(-i), 16));
  }
  return result;
}

export function solve2(input, times = 1000) {
  let parts = [
    [parseInt(input.slice(0, 5), 16)],
    [parseInt(input.slice(5, 10), 16)],
    [parseInt(input.slice(10, 15), 16)],
  ];
  for (let i = 0; i < times; i++) {
    parts.forEach(part => part.push((part.at(-1) * 421 + 37) % 3872873));
  }
  return parts
    .flatMap(part => part.slice(-4).map(x => (x % 16).toString(16)))
    .join("");
}
