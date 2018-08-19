const Tab = require('../../model/tab');

function getTab(_, { _id }) {
  return Tab.findById(_id);
}

function getTabs(_, { name }) {
  if (name) {
    return Tab.find({ name });
  }
  return Tab.find({});
}

function createTab(_, { name }) {
  const newTab = new Tab({ name });
  return newTab.save();
}

module.exports = {
  getTab,
  getTabs,
  createTab,
};
