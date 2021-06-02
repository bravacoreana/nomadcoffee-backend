import { createWriteStream } from "fs";
import bcrypt from "bcrypt";
import client from "../../client";
import { protectedResolver } from "../users.utilities";

const resolverFunction = async (
  _,
  {
    username,
    email,
    name,
    password: newPassword,
    location,
    avatar,
    githubUsername,
  },
  { loggedInUser }
) => {
  let avatarUrl = null;
  if (avatar) {
    const { filename, createReadStream } = await avatar;
    const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
    const readStream = createReadStream();
    const writeStream = createWriteStream(
      process.cwd() + "/uploads/" + loggedInUser.id + newFilename
    );
    readStream.pipe(writeStream);
    avatarUrl = `http://localhost:${process.env.PORT}/static/${newFilename}`;
  }

  let hashedPassword = null;

  if (newPassword) {
    hashedPassword = await bcrypt.hash(newPassword, 10);
  }

  const updatedUser = await client.user.update({
    where: {
      id: loggedInUser.id,
    },
    data: {
      username,
      email,
      name,
      location,
      githubUsername,
      ...(hashedPassword && { password: hashedPassword }),
      ...(avatar && { avatar: avatar }),
    },
  });
  if (updatedUser.id) {
    return {
      ok: true,
    };
  } else {
    return {
      ok: false,
      error: "Could not update profile.",
    };
  }
};

export default {
  Mutation: {
    editProfile: protectedResolver(resolverFunction),
  },
};