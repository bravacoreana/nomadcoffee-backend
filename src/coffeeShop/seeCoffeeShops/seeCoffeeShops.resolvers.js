import client from "../../client";

export default {
  Query: {
    seeCoffeeShops: async (_, { page = 1 }) => {
      try {
        return await client.coffeeShop.findMany({
          take: 5,
          skip: (page - 1) * 5,
          orderBy: {
            updatedAt: "desc",
          },
        });
      } catch (error) {
        console.log("[seeCoffeeShops]", error);
      }
    },
  },
};
