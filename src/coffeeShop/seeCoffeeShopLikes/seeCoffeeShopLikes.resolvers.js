import client from "../../client";

export default {
  Query: {
    seeShopLikes: async (_, { id }) => {
      const likes = await client.like.findMany({
        where: {
          shopId: id,
        },
        select: {
          user: true,
        },
      });
      return likes.map((like) => like.user);
    },
  },
};
