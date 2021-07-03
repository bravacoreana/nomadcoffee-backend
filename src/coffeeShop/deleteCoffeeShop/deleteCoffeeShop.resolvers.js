import client from "../../client";
import { protectedResolver } from "../../users/users.utilities";

export default {
  Mutation: {
    deleteCoffeeShop: protectedResolver(async (_, { id }, { loggedInUser }) => {
      const cafe = await client.coffeeShop.findUnique({
        where: {
          id,
        },
        select: {
          userId: true,
        },
      });
      if (!cafe) {
        return {
          ok: false,
          error: "Cafe doesn't exist",
        };
      } else if (cafe.userId !== loggedInUser.id) {
        return {
          ok: false,
          error: "Not authorised",
        };
      } else {
        await client.coffeeShop.delete({
          where: { id },
        });
        return {
          ok: true,
        };
      }
    }),
  },
};
