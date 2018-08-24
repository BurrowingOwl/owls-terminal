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
    Query: () => ({}),
    Mutation: {
      selectTabId: (_, { tabId }, { cache }) => {
        cache.writeData({ data: { selectedTabId: tabId } });
        return null;
      },
      updateLoginData: (_, { _id, username, name, isLoggedIn, token }, { cache }) => {
        const userData = { _id, username, name, isLoggedIn, token };
        localStorage.setItem('token', token);
        cache.writeData({ data: { login: { ...userData, __typename: 'LoginState' } } });
        return null; // 아무것도 return할게 없어도 return 해줘야 에러가 안뜸.
      },
    },
  },
};

export default clientState;
