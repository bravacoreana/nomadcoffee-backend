import client from "../../client";
import { PER_PAGE } from "../../constants";

export default {
  Query: {
    seeCoffeeShops: async (_, { offset }) => {
      try {
        const shops = await client.coffeeShop.findMany({
          take: PER_PAGE,
          skip: offset,
          orderBy: {
            updatedAt: "desc",
          },
          include: { photos: true, user: true, categories: true, likes: true },
        });

        return shops;
      } catch (error) {
        console.log("[seeCoffeeShops]", error);
      }
    },
  },
};
