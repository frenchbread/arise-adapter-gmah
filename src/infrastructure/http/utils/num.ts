export function getMultiplier(n: number) {
  let k = 1;
  for (let i = 0; i < n; i++) {
    k *= 10;
  }
  return k;
}

export function getDecimalPlaces(num: number) {
  if (Number.isInteger(num)) {
    return 0;
  }
  const decimalStr = num.toString().split(".")[1];
  return decimalStr.length;
}
