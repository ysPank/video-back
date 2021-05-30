export const clearFalsy = (object, extraFalsy = ['']) => {
  const falsy = [null, undefined, ...extraFalsy];

  Object.keys(object).forEach(key => {
    if (falsy.includes(object[key])) {
      delete object[key];
    }
  });

  return object;
};
