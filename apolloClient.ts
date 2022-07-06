// import fetch from 'node-fetch'



import fetch from 'cross-fetch'; //this is added extra
// import { ApolloClient, HttpLink } from '@apollo/client';
// const client = new ApolloClient({
//   link: new HttpLink({ uri: '/graphql', fetch })
// });






import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
    )
  if (networkError) console.log(`[Network error]: ${networkError}`)
})
/*  old -> 'https://api.thegraph.com/subgraphs/name/kousika1/my-subgraph'*/
const link = from([
  errorLink,
  new HttpLink({
    uri: 'https://bsc.streamingfast.io/subgraphs/name/pancakeswap/exchange-v2', fetch
  }),
])
const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
})
export default client