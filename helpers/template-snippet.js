function part1(input) {
  return input;
}

function part2(input) {
  return input;
}

await (async () => {
  const day = 'yyyy/day/d';
  // const input = localStorage[day] ??= (await (await fetch(`https://adventofcode.com/${day}/input`)).text()).trim();
  const input = document.querySelectorAll('code')[0].textContent;

  console.log('Part 1', part1(input));
  console.log('Part 2', part2(input));
})();
