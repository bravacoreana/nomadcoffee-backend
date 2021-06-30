import client from "../../client";

export default {
  Query: {
    searchUsers: async (_, { keyword, page = 1 }) =>
      await client.user.findMany({
        where: {
          username: {
            startsWith: keyword.toLowerCase(),
          },
        },
      }),
  },
};
