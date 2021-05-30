import faker from 'faker';

/**
 * Generate unique name
 * @param {string[]} userNames
 */
export const generateName = (userNames) => {
  const name = faker.name.findName();
  if (userNames.includes(name)) return generateName(userNames);

  return name;
};

