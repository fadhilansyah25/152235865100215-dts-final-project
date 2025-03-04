import millify from "millify";

export const formatterUSD = (number, minFracDigits = 2) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",

    // These options are needed to round to whole numbers if that's what you want.
    minimumFractionDigits: minFracDigits, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

  return formatter.format(Number(number)).replace(/^(\D+)/, "$1 ");
};

export const millifyNumber = (data = 0, props = {} ) => {
  return millify(Number(data), {
    ...props,
    space: true,
    units: [
      "",
      "K",
      "Million",
      "Billion",
      "Trillion",
      "Quadrillion",
      "Quintillion",
    ],
  });
};
