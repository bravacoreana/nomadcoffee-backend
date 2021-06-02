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
          take: 5,
          skip: (page - 1) * 5,
          orderBy: {
            updatedAt: "desc",
          },
        });
    },
  },
};
