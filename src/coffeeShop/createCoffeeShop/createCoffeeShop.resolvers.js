import client from "../../client";
import { createWriteStream } from "fs";
import { protectedResolver } from "../../users/users.utilities";
import { createSlug } from "../coffeeShop.utilities";

export default {
  Mutation: {
    createCoffeeShop: protectedResolver(
      async (
        _,
        { name, latitude, longitude, photos, categories },
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
                const { filename, createReadStream } = await photo;
                const readStream = createReadStream();
                const writeStream = createWriteStream(
                  process.cwd() + "/uploads/" + filename
                );
                readStream.pipe(writeStream);

                photosObj.push({
                  url: filename,
                });
              })
            );
          }

          const createCoffeeShop = await client.coffeeShop.create({
            data: {
              name,
              latitude,
              longitude,
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