// TODO: lodash merge이용하여 코드스플리팅.
const clientState = {
  defaults: {
    login: {
      __typename: 'LoginState',
      _id: '',
      username: '',
      name: '',
      isLoggedIn: false,
    },
    selectedTabId: '',
  },
  resolvers: {
    Mutation: {
      selectTabId: (_, { tabId }, { cache }) => {
        cache.writeData({ data: { selectedTabId: tabId } });
        return null;
      },
      updateLoginData: (_, { _id, username, name, isLoggedIn, token }, { cache }) => {
        const userData = { _id, username, name, isLoggedIn, token };
        cache.writeData({ data: { login: { ...userData, __typename: 'LoginState' } } });
      },
    },
  },
};

export default clientState;
