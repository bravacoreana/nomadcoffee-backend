import client from "../../client";

export default {
  Query: {
    seeCategories: async (_, { page = 1 }) => {
      await client.category.findMany({
        take: 6,
        skip: (page - 1) * 6,
        orderBy: {
          updatedAt: "desc",
        },
      });
    },
  },
};
