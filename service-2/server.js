const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  { graphqlExpress } = require("apollo-server-express"),
  schema = require("./schema"),
  { decryptMiddleware, encryptOverride } = require("../utils");

app.use(
  "/graphql",
  bodyParser.json(),
  decryptMiddleware,
  encryptOverride,
  graphqlExpress({ schema })
);
const PORT = process.env.PORT || 8083;
app.listen(PORT, () => console.log("GraphQL API listening on port:" + PORT));
