import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createClient } from "graphql-ws";
import { split, HttpLink } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";

const wsLink = new GraphQLWsLink(
  createClient({
    url: "ws://localhost:8080/v1/graphql",
  })
);

const httpLink = new HttpLink({
  uri: "http://localhost:8080/v1/graphql",
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default client;