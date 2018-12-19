
export const changeObjectKeys = (object, replaces, remove = []) => Object.keys(object)
  .filter((key) => !remove.includes(key))
  .reduce((newObject, currentKey) => ({
    ...newObject,
    [replaces[currentKey] || currentKey]: object[currentKey]
  }), {})
