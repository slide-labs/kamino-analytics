export const formatterNumber = (
  number: number | undefined | null,
  noCurrency?: boolean
) => {
  if (number === undefined || number === null) return;

  if (isNaN(number)) {
    return "$0,00";
  }

  let replaceNumber = number.toString().replace(",", "");

  if (replaceNumber.indexOf(",") !== -1)
    replaceNumber = replaceNumber.replace(",", ".");
  let numNew = parseFloat(replaceNumber) * 100;

  let finalValue = Math.floor(numNew) / 100;

  const styleCurrency = finalValue.toLocaleString("en-us", {
    style: "currency",
    currency: "USD",
  });

  if (!noCurrency) return styleCurrency;

  return styleCurrency.replace("$", "");
};
