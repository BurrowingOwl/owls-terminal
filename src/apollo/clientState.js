const clientState = {
  defaults: {
    selectedTabId: '',
  },
  resolvers: {
    Mutation: {
      selectTabId: (_, { tabId }, { cache }) => {
        cache.writeData({ data: { selectedTabId: tabId } });
        return null;
      },
    },
  },
};

export default clientState;
