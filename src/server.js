require("dotenv").config();
import express from "express";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import { getUser, protectedResolver } from "./users/users.utilities";
import { typeDefs, resolvers } from "./schema";

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

// const corsOptions = {
//   origin: "https://nomadcafe.netlify.app/" || `http://localhost:${PORT}`,
//   credentials: true,
// };

const app = express();
apollo.applyMiddleware({ app });
app.use("*", cors(), (req, res) => {
  return res.status(404).json({ message: "Not Found" });
});
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type,multipart/form-data,Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  if (req.method === "OPTIONS") {
    return res.send(204);
  }
  next();
});
app.use("/static", express.static("uploads"));
// app.get("/add", cors(corsOptions), function (req, res, next) {
//   res.json({ msg: "This is CORS-enabled for a whitelisted domain." });
// });

app.listen({ port: PORT }, () => {
  console.log(`🌱 Server ready at http://localhost:${PORT} `);
  console.log(`⭐️ CORS-enabled web server listening on port: ${PORT}`);
});
