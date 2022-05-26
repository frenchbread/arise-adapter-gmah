import "isomorphic-unfetch";
import { createClient } from "@urql/core";
import config from "src/config";

export const client = createClient({
  url: config.graphqlEndpoint,
});
