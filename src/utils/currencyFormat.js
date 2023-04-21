// export const currencyFormat = (price) => {
//   return price ? format(price, 0, 3, ' ', ' ') : 0 + ' ₽';
// };
// const format = function (price, n, x, s, c) {
//   var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
//     num = price.toFixed(Math.max(0, ~~n));

//   return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ',')) + ' ₽';
// };

export function currencyFormat(n) {
  return (
    Math.floor(n)
      ?.toFixed(0)
      ?.replace(/./g, function (c, i, a) {
        return i > 0 && c !== '.' && (a.length - i) % 3 === 0 ? ' ' + c : c;
      }) + ' ₽'
  );
}
