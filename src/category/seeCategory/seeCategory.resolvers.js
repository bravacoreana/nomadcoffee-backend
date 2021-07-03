import client from "../../client";

export default {
  Query: {
    seeCategory: async (_, { name, page = 1 }) => {
      await client.category
        .findUnique({
          where: {
            name,
          },
        })
        .shops({
          take: 6,
          skip: (page - 1) * 6,
          orderBy: {
            updatedAt: "desc",
          },
        });
    },
  },
};
