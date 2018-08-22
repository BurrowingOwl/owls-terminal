const Tab = require('../model/tab');
const { mapKeysToValues } = require('../util/dataloader');

function getTabById(id) {
  return Tab.findById(id);
}

// dataloader 적용.
// dataloader에서는 keys(tabIds)와 values(tabs)의 길이와 순서가 같아야 한다.
// 아래에서 tabIds가 만약 중복된 여러개의 key값이라면, find의 결과는 1개 이므로 길이가 다르다.
// 따라서, mapKeysToValues를 통해 mapping을 해준다.
// util 함수 참고.
async function getTabsByIds(tabIds) {
  const tabs = await Tab.find({ _id: tabIds });
  const mappedTabs = mapKeysToValues(tabIds, tabs, '_id');
  return mappedTabs;
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
  getTabsByIds,
  getTabsByQuery,
  createTab,
};
