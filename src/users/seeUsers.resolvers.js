import client from "../client";

export default {
  User: {
    followers: async ({ id }, { page = 1 }) =>
      await client.user.findUnique({ where: { id } }).followers({
        take: 6,
        skip: (page - 1) * 6,
        orderBy: {
          name: "asc",
        },
      }),

    following: async ({ id }, { page = 1 }) =>
      await client.user.findUnique({ where: { id } }).following({
        take: 6,
        skip: (page - 1) * 6,
        orderBy: {
          name: "asc",
        },
      }),
    isMe: ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      return id === loggedInUser.id;
    },
    isFollowing: async ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      const exists = await client.user.count({
        where: {
          username: loggedInUser.username,
          following: {
            some: {
              id,
            },
          },
        },
      });
      return Boolean(exists);
    },
    shops: ({ id }, { offset }) =>
      client.user.findUnique({ where: { id } }).shops(),
  },
};
