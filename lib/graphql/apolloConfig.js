import withApollo from 'next-with-apollo';
import ApolloClient, { InMemoryCache } from 'apollo-boost';

const apolloClient = ({ initialState }) =>
  new ApolloClient({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPONT,
    cache: new InMemoryCache().restore(initialState ?? {}),
  });

export default withApollo(apolloClient);
