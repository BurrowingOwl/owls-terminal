const groupBy = require('lodash/groupBy');
// mongodb ID비교를 위해 equals 사용.
module.exports = {
  mapKeysToValues(keys, values, field) {
    const groupValues = groupBy(values, field);
    const mappedValues = keys.map(key => {
      const mapping = groupValues[key];
      if (mapping) {
        return mapping[0];
      }
      return {}; // Dataloader는 같은 길이를 요구.
    });
    return mappedValues;
  },
};
