export function solve(input) {
  let chars = input.split("");
  let result = 0;
  for (let i = 1; i <= chars.length / 2; i++) {
    result += i * (parseInt(input[i - 1], 16) + parseInt(input.at(-i), 16));
  }
  return result;
}
