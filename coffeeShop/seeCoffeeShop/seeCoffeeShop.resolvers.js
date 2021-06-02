import client from "../../client";

export default {
  Query: {
    seeCoffeeShop: async (_, { id }) =>
      await client.coffeeShop.findUnique({
        where: { id },
      }),
  },
};
