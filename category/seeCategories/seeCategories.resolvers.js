import client from "../../client";

export default {
  Query: {
    seeCategories: async (_, { page = 1 }) => {
      await client.category.findMany({
        take: 5,
        skip: (page - 1) * 5,
        orderBy: {
          updatedAt: "desc",
        },
      });
    },
  },
};
