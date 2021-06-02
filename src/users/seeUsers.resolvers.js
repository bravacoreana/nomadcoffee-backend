import client from "../client";

export default {
  User: {
    followers: async ({ id }, { page = 1 }) =>
      await client.user.findUnique({ where: { id } }).followers({
        take: 5,
        skip: (page - 1) * 5,
        orderBy: {
          name: "asc",
        },
      }),

    following: async ({ id }, { page = 1 }) =>
      await client.user.findUnique({ where: { id } }).following({
        take: 5,
        skip: (page - 1) * 5,
        orderBy: {
          name: "asc",
        },
      }),
  },
};
