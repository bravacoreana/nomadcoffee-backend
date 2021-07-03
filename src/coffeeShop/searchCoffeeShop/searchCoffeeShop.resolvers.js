import client from "../../client";
import { PER_PAGE } from "../../constants";

export default {
  Query: {
    searchCoffeeShop: async (_, { keyword, offset }) =>
      await client.coffeeShop.findMany({
        take: PER_PAGE,
        skip: offset,
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
    searchShopName: async (_, { keyword, offset }) =>
      await client.coffeeShop.findMany({
        take: PER_PAGE,
        skip: offset,
        where: {
          name: {
            contains: keyword.toLowerCase(),
          },
        },
      }),
    // searchCategories: async (_, { keyword, offset }) =>
    //   await client.coffeeShop.findMany({
    //     take: PER_PAGE,
    //     skip: offset,
    //     where: {
    //       categories: {
    //         some: {
    //           name: {
    //             contains: keyword.toLowerCase(),
    //           },
    //         },
    //       },
    //     },
    //   }),
  },
};
