import client from "../../client";
import { uploadPhoto } from "../../common/shared.utilities";
import { protectedResolver } from "../../users/users.utilities";
import { createSlug } from "../coffeeShop.utilities";

const resolveFunction = async (
  _,
  { id, name, latitude, longitude, photos, categories },
  { loggedInUser }
) => {
  try {
    let categoriesObj = [];
    let photosObj = [];

    const shop = await client.coffeeShop.findFirst({
      where: { id },
      include: {
        categories: { select: { slug: true } },
        photos: { select: { url: true } },
      },
    });

    if (!shop) {
      return {
        ok: false,
        error: "can't edit",
      };
    }

    if (categories) {
      categories.map((name) => {
        const slug = createSlug(name);
        categoriesObj.push({
          where: { name },
          create: { name, slug },
        });
      });
    }

    if (photos) {
      await Promise.all(
        photos.map(async (photo) => {
          let photoUrl = await uploadPhoto(
            photo,
            loggedInUser.id,
            "coffeeshops"
          );
          photosObj.push({
            url: photoUrl,
          });
        })
      );
    }

    await client.coffeeShop.update({
      where: { id: shop.id },
      data: {
        name,
        latitude,
        longitude,
        ...(categoriesObj.length > 0 && {
          categories: {
            disconnect: shop.categories,
            connectOrCreate: categoriesObj,
          },
        }),
        ...(photosObj.length > 0 && {
          photos: {
            deleteMany: {},
            create: photosObj,
          },
        }),
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
