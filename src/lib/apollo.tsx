import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const API_ENDPOINT = "https://rickandmortyapi.com/graphql";

export function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: new HttpLink({
      uri: API_ENDPOINT,
    }),
    cache: new InMemoryCache(),
  });
}

export function initializeApollo(initialState = null) {
  const client = createApolloClient();

  if (initialState) {
    client.cache.restore(initialState);
  }

  return client;
}

export function useApollo(initialState: any = undefined) {
  return initializeApollo(initialState);
}
