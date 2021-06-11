require("dotenv").config();
import express from "express";
import cors from "cors";
import logger from "morgan";
import { ApolloServer } from "apollo-server-express";
import { getUser, protectedResolver } from "./users/users.utilities";
import { typeDefs, resolvers } from "./schema";

const PORT = process.env.PORT;
const apollo = new ApolloServer({
  typeDefs,
  resolvers,
  playground: false,
  introspection: false,

  context: async ({ req }) => {
    return {
      loggedInUser: await getUser(req.headers.token),
      protectedResolver,
    };
  },
});

const app = express();
app.use(logger("tiny"));
app.use(cors());
app.use("/static", express.static("uploads"));
apollo.applyMiddleware({ app });

app.listen({ port: PORT }, () => {
  console.log(`🌱 Server ready at http://localhost:${PORT} `);
});
