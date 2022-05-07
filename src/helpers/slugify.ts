export const slugify = (...args: (string | undefined)[]): string => {
  if (args === undefined) {
    return '';
  }

  const value = args.join(' ');

  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 ]/g, '')
    .replace(/\s+/g, '-');
};
