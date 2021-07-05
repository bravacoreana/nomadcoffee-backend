import client from "../../client";
import { PER_PAGE } from "../../constants";

export default {
  Query: {
    userCoffeeShops: async (_, { id, offset }) => {
      try {
        const userShops = await client.coffeeShop.findMany({
          where: {
            userId: id,
          },
          take: PER_PAGE,
          skip: offset,
          orderBy: {
            updatedAt: "desc",
          },
          include: { photos: true, user: true, likes: true },
        });
        return userShops;
      } catch (error) {
        console.log("[userCoffeeShops]", error);
      }
    },
  },
};
