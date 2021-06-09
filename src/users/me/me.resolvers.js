import client from "../../client";
import { protectedResolver } from "../users.utilities";

export default {
  Query: {
    me: protectedResolver((_, __, { loggedInUser }) =>
      client.user.findUnique({ where: { id: loggedInUser.id } })
    ),
  },
};
