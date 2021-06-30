import client from "../../client";
import { protectedResolver } from "../../users/users.utilities";

export default {
  Mutation: {
    toggleLike: protectedResolver(async (_, { id }, { loggedInUser }) => {
      const shop = await client.coffeeShop.findUnique({
        where: {
          id,
        },
      });
      if (!shop) {
        return {
          ok: false,
          error: "Shop not found",
        };
      }
      const likeWhere = {
        shopId_userId: {
          shopId: id,
          userId: loggedInUser.id,
        },
      };
      const like = await client.like.findUnique({
        where: likeWhere,
      });
      if (like) {
        await client.like.delete({
          where: likeWhere,
        });
      } else {
        await client.like.create({
          data: {
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
            shop: {
              connect: {
                id,
              },
            },
          },
        });
      }
      return {
        ok: true,
      };
    }),
  },
};
