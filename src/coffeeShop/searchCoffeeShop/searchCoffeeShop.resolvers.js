import client from "../../client";

export default {
  Query: {
    searchCoffeeShop: async (_, { keyword }) =>
      await client.coffeeShop.findMany({
        where: {
          OR: [
            {
              name: {
                contains: keyword.toLowerCase(),
              },
            },
            {
              categories: {
                some: {
                  name: {
                    contains: keyword.toLowerCase(),
                  },
                },
              },
            },
          ],
        },
        // include: { photos: true },
        orderBy: {
          createdAt: "desc",
        },
      }),
    searchShopName: async (_, { keyword }) =>
      await client.coffeeShop.findMany({
        where: {
          name: {
            contains: keyword.toLowerCase(),
          },
        },
      }),
    searchCategories: async (_, { keyword }) =>
      await client.coffeeShop.findMany({
        where: {
          categories: {
            some: {
              name: {
                contains: keyword.toLowerCase(),
              },
            },
          },
        },
      }),
  },
};
