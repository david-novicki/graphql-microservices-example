const fetch = require("node-fetch");
const {
  makeRemoteExecutableSchema,
  introspectSchema
} = require("graphql-tools");

const fetcher = (url, isIntrospection) => async ({
  query,
  variables,
  operationName
}) => {
  let body = JSON.stringify({ query, variables, operationName });
  if (!isIntrospection) {
    console.log("encrypting request at service level...");
  }
  console.log("requesting at service level...");
  const fetchResult = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body
  });
  const jsonResult = fetchResult.json();
  if (!isIntrospection) {
    console.log("decrypting response at service level...");
  }
  return jsonResult;
};

module.exports = {
  getIntrospectSchema: async url => {
    // make an executable schema
    return makeRemoteExecutableSchema({
      schema: await introspectSchema(fetcher(url, true)),
      fetcher: fetcher(url, false)
    });
  }
};
