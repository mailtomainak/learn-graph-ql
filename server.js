const express = require("express");
const expressGraphQL = require("express-graphql");
const schema = require("./schema/schema");
const server = express();

server.use(
  "/graphql",
  expressGraphQL({
    schema,
    graphiql: true
  })
);
server.listen(8091);
