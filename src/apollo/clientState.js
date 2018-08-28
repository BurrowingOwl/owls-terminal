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
  },
  resolvers: {
    Query: () => ({}),
    Mutation: {
      updateLoginData: (_, { _id = '', username = '', name = '', isLoggedIn = false, token }, { cache }) => {
        const userData = { _id, username, name, isLoggedIn, token };
        localStorage.setItem('token', token);
        cache.writeData({ data: { login: { ...userData, __typename: 'LoginState' } } });
        return null; // 아무것도 return할게 없어도 return 해줘야 에러가 안뜸.
      },
    },
  },
};

export default clientState;
