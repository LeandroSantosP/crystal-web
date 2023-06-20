export function FormatToDecimalToMoney(value: string) {
  const number = parseFloat(
    value.replace('R$ ', '').replace('.', '').replace(',', '.')
  ).toFixed(2);

  return Number(number);
}
