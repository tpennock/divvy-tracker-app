// utility functions

// convert whole dollar into roman numeral
export function convertCurrencyAsRomanNumeral(currency) {
  console.info(currency);
  const romanNumeralVals = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1
  };
  let roman = '',
  i;

  for ( i in romanNumeralVals ) {
    while ( currency >= romanNumeralVals[i] ) {
      roman += i;
      currency -= romanNumeralVals[i];
    }
  }

  return roman;
};

// convert an object into an array
export function convertObjToArray(obj) {
  let list = Object.keys(obj).map(function(key, idx) {
    return [key, obj[key]];
  });
}
