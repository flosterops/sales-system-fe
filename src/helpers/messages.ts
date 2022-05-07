import lodash from 'lodash';

interface WithId {
  id: number | string;
}

export const composeMessages = <T extends WithId>(
  previousMessages: T[],
  nextMessages: T[],
): T[] => {
  const lastElementIndex = lodash.findIndex<T>(previousMessages, {
    id: lodash.last(nextMessages)?.id,
  } as object);

  if (lastElementIndex === -1) {
    return lodash.uniqBy([...nextMessages, ...previousMessages], 'id');
  }

  return lodash.uniqBy(
    [...nextMessages, ...previousMessages.slice(lastElementIndex + 1)],
    'id',
  );
};

export const mapEmailBody = (template: string, values: Record<string, string>) => {
  let result = template;
  Object.entries(values).forEach(([key, value]) => {
    result = result.replaceAll(`{${key}}`, value);
  });
  return result;
};
