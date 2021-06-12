import express from "express";
import { ApolloServer } from "apollo-server-express";
import { getUser, protectedResolver } from "./users/users.utilities";
import { typeDefs, resolvers } from "./schema";
require("dotenv").config();

const PORT = process.env.PORT;
const apollo = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  introspection: true,
  context: async ({ req }) => {
    return {
      loggedInUser: await getUser(req.headers.token),
      protectedResolver,
    };
  },
});

const app = express();
apollo.applyMiddleware({ app });
app.get("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.use("/static", express.static("uploads"));

app.listen({ port: PORT }, () => {
  console.log(`🌱 Server ready at http://localhost:${PORT} `);
  console.log(`⭐️ CORS-enabled web server listening on port: ${PORT}`);
});
