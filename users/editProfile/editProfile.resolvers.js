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
    avatarUrl,
    githubUsername,
  },
  { loggedInUser }
) => {
  let avatar = null;
  if (avatarUrl) {
    const { filename, createReadStream } = await avatarUrl;
    const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
    const readStream = createReadStream();
    const writeStream = createWriteStream(
      process.cwd() + "/uploads/" + loggedInUser.id + newFilename
    );
    readStream.pipe(writeStream);
    avatar = `http://localhost:${process.env.PORT}/static/${newFilename}`;
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
      ...(avatar && { avatarUrl: avatar }),
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
