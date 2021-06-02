import client from "../../client";

export default {
  Query: {
    seeCoffeeShops: async (_, { page = 1 }) =>
      await client.coffeeShop.findMany({
        take: 5,
        skip: (page - 1) * 5,
        orderBy: {
          updatedAt: "desc",
        },
      }),
  },
};
