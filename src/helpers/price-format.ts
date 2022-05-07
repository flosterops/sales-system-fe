/**
 *
 */
const formatter = new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'GBP',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

/**
 *
 * @param value
 */
export const priceFormatter = (
  value: number | string | null | undefined,
): string | number | null => {
  if (value === undefined) {
    return '';
  }
  if (typeof value === 'string' && value !== '') {
    value = parseFloat(value);
  }
  if (typeof value === 'number') {
    return formatter.format(value);
  }
  return value;
};
