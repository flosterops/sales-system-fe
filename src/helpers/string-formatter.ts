export const getNumberWithComma = (value: number) =>
  value.toLocaleString('en-GB', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

export const formatPrice = (price: number) =>
  `${price < 0 ? '-' : ''}£${getNumberWithComma(Math.abs(price))}`;
