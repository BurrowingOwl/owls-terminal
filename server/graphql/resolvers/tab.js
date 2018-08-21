const tabQuery = require('../../query/tab');

function getTab(_, { _id }) {
  return tabQuery.getTabById(_id);
}

function getTabs(_, { name }) {
  let query = {};
  if (name) {
    query = { name };
  }
  return tabQuery.getTabsByQuery(query);
}

function createTab(_, { name }) {
  return tabQuery.createTab({ name });
}

module.exports = {
  getTab,
  getTabs,
  createTab,
};
