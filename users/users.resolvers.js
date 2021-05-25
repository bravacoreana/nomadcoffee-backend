import client from "../client";

export default {
  Query: {
    users: () => client.user.findMany(),
    user: (_, { id }) => client.user.findUnique({ where: { id } }),
  },
};
