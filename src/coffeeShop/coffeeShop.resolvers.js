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
    likes: ({ id }) => client.like.count({ where: { shopId: id } }),
    isLiked: async ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      const ok = await client.like.findUnique({
        where: {
          shopId_userId: {
            shopId: id,
            userId: loggedInUser.id,
          },
        },
        select: {
          id: true,
        },
      });
      if (ok) {
        return true;
      }
      return false;
    },
  },
};
