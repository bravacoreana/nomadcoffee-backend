import client from "../client";

export default {
  CoffeeShop: {
    user: async ({ id }) =>
      await client.coffeeShop.findUnique({ where: { id } }).user(),
    photos: async ({ id }) =>
      await client.coffeeShop.findUnique({ where: { id } }).photos(),
    categories: async ({ id }) =>
      await client.coffeeShop.findUnique({ where: { id } }).categories(),
    isMine: ({ userId }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      return userId === loggedInUser.id;
    },
  },
};
