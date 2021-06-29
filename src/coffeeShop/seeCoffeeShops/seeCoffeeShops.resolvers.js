import client from "../../client";
import { PER_PAGE } from "../../constants";

export default {
  Query: {
    seeCoffeeShops: async (_, { page = 1 }) => {
      try {
        const shops = await client.coffeeShop.findMany({
          take: PER_PAGE,
          skip: (page - 1) * PER_PAGE,
          orderBy: {
            updatedAt: "desc",
          },
        });
        const shopsCount = await client.coffeeShop.count();
        const lastPage = Math.ceil(shopsCount / PER_PAGE);

        // return shops;
        return { shops, shopsCount, lastPage };
      } catch (error) {
        console.log("[seeCoffeeShops]", error);
      }
    },
  },
};
