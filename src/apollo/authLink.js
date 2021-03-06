import { setContext } from 'apollo-link-context';
// const request = (operation) => {
//   const token = localStorage.getItem('token');
//   if (!token) {
//     return;
//   }
//   const authorization = `Bearer ${token}`;
//   operation.setContext({
//     headers: {
//       authorization,
//     },
//   });
// };
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

export default authLink;
