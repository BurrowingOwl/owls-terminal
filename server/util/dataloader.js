// mongodb ID비교를 위해 equals 사용.
module.exports = {
  mapKeysToValues(keys, values, field) {
    const mappedValues = keys.map(key => (
      values.find(value => value[field].equals(key))
    ));
    return mappedValues;
  },
};
