function exec(input) {
  let [rules, mine, nearby] = input.split('\n\n');

  const ranges = rules.match(/\d+-\d+/g).map(s => {
    const [min, max] = s.split('-');
    return [Number(min), Number(max)];
  });

  const [, ticket] = mine.split('\n');
  const [, ...tickets] = nearby.split('\n');

  let errs = 0;

  function validate(n) {
    n = Number(n);
    if(!ranges.some(([min, max]) => n >= min && n <= max)) {
      errs += n;
    }
  }

  ticket.split(',').forEach(validate);
  tickets.forEach(t => t.split(',').forEach(validate));

  return errs;
}

exec(`class: 1-3 or 5-7
row: 6-11 or 33-44
seat: 13-40 or 45-50

your ticket:
7,1,14

nearby tickets:
7,3,47
40,4,50
55,2,20
38,6,12`);
