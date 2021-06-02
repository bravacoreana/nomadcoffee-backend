import client from "../../client";
import { protectedResolver } from "../../users/users.utilities";
import { createSlug } from "../coffeeShop.utilities";

const resolveFunction = async (
  _,
  { id, name, latitude, longitude, categories }
) => {
  try {
    let categoriesObj = [];

    if (categories) {
      categories.map((name) => {
        const slug = createSlug(name);
        categoriesObj.push({
          where: { name },
          create: { name, slug },
        });
      });
    }

    const shop = await client.coffeeShop.findFirst({
      where: { id },
      include: { categories: { select: { slug: true } } },
    });

    if (!shop) {
      return {
        ok: false,
        error: "can't edit",
      };
    }

    await client.coffeeShop.update({
      where: { id: shop.id },
      data: {
        name,
        latitude,
        longitude,
        categories: {
          disconnect: shop.categories,
          connectOrCreate: categoriesObj,
        },
      },
    });
    return {
      ok: true,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      error: `${error}`,
    };
  }
};

export default {
  Mutation: {
    editCoffeeShop: protectedResolver(resolveFunction),
  },
};
