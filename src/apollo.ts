import { ApolloClient, InMemoryCache } from "@apollo/client";
import { HttpLink } from "@apollo/client/link/http";
import { credential } from "firebase-admin";
import { useMemo } from "react";

function createApolloClient() {
  return new ApolloClient({
    link: new HttpLink({ uri: "/api/graphql", credentials: "same-origin" }),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: "cache-and-network",
      },
    },
  });
}

export function useApollo() {
  const client = useMemo(() => createApolloClient(), []);
  return client;
}
