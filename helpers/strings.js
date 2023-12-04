export const splitAtLength = len => str => str.match(new RegExp(`.{1,${len}}`, 'g'));
