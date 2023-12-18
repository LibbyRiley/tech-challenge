"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { UserProvider } from "../context/UserContext";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../lib/apollo";

export function Providers({ children }: { children: React.ReactNode }) {
  const apolloClient = useApollo();

  return (
    <ChakraProvider>
      <ApolloProvider client={apolloClient}>
        <UserProvider>{children}</UserProvider>
      </ApolloProvider>
    </ChakraProvider>
  );
}
