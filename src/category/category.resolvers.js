import client from "../client";

export default {
  Category: {
    totalShops: async (name) =>
      await client.coffeeShop.count({
        where: { categories: { some: { name } } },
      }),
  },
};
