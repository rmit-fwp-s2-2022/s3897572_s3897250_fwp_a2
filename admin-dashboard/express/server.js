const express = require("express");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const db = require("../../fullstack_fwp/express/src/database");
const graphql = require("./src/graphql");

// Database will be sync'ed in the background.
db.sync();

const app = express();

// Parse requests of content-type - application/json.
app.use(express.json());

// Add CORS suport.
app.use(cors());

// Add GraphQL to express server.
// NOTE: You can use the GraphQL web-interface to test the GraphQL schema thanks to the graphiql parameter being true.
// Access the web-interface when the server is running here: http://localhost:4000/graphql
app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphql.schema,
    rootValue: graphql.root,
    graphiql: true
  })
);

// Set port, listen for requests.
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
