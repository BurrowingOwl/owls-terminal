const Tab = require('../model/tab');

function getTabById(id) {
  return Tab.findById(id);
}

function getTabsByQuery(query = {}) {
  return Tab.find(query);
}

function createTab(tab) {
  const newTab = new Tab(tab);
  return newTab.save();
}

module.exports = {
  getTabById,
  getTabsByQuery,
  createTab,
};
