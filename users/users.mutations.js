import bcrypt from "bcrypt";
import client from "../client";

export default {
  Mutation: {
    createAccount: async (_, { username, email, name, password }) => {
      try {
        const existingUser = await client.user.findFirst({
          where: {
            OR: [
              {
                username,
              },
              {
                email,
              },
            ],
          },
        });

        if (existingUser) {
          throw new Error("This username or email is not available.");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await client.user.create({
          data: {
            username,
            email,
            name,
            password: hashedPassword,
          },
        });
        return {
          ok: true,
        };
      } catch (error) {
        console.log(error);
        return {
          ok: false,
          error: "can't create account.",
        };
      }
    },
  },
};
