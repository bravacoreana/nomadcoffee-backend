import client from "../../client";
import { PER_PAGE } from "../../constants";

export default {
  Query: {
    searchCategories: async (_, { keyword, offset }) =>
      await client.category.findMany({
        take: PER_PAGE,
        skip: offset,
        where: {
          slug: {
            contains: keyword.toLowerCase(),
          },
        },
        orderBy: {
          updatedAt: "desc",
        },
      }),
  },
};
