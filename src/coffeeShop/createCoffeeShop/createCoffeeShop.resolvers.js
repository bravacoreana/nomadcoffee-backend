import client from "../../client";
import { protectedResolver } from "../../users/users.utilities";
import { createSlug } from "../coffeeShop.utilities";
import { uploadPhoto } from "../../common/shared.utilities";

export default {
  Mutation: {
    createCoffeeShop: protectedResolver(
      async (
        _,
        { name, latitude, longitude, photos, caption, categories },
        { loggedInUser }
      ) => {
        try {
          let categoriesObj = [];
          let photosObj = [];

          const shopWhere = {
            name,
            latitude,
            longitude,
          };

          const existedShop = await client.coffeeShop.findFirst({
            where: shopWhere,
          });

          if (existedShop) {
            return {
              ok: false,
              error: "shop already exists.",
            };
          }

          if (categories) {
            let categoryToArray = null;
            if (categories[0].includes(",")) {
              categoryToArray = categories[0].split(",");
            } else {
              categoryToArray = categories;
            }

            categoryToArray.map((name) => {
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

          const createCoffeeShop = await client.coffeeShop.create({
            data: {
              name,
              latitude,
              longitude,
              caption,
              user: { connect: { id: loggedInUser.id } },
              ...(categoriesObj.length > 0 && {
                categories: {
                  connectOrCreate: categoriesObj,
                },
              }),
              ...(photosObj.length > 0 && {
                photos: {
                  create: photosObj,
                },
              }),
            },
          });

          if (!createCoffeeShop) {
            return {
              ok: false,
              error: "can't create",
            };
          }
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
      }
    ),
  },
};
