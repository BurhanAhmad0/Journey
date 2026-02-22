import UserModel from "../Models/UserModel.js";
import Cloudinary from "../Config/Cloudinary.js";
import streamifier from "streamifier";

export const uploadProfilePictureService = async (userId, fileBuffer) => {
  if (!userId) {
    const error = new Error("User ID not found");
    error.status = 400;
    throw error;
  }

  const user = await UserModel.findById(userId).select(
    "avatar avatar_public_id",
  );
  if (!user) {
    const error = new Error("User not found");
    error.status = 404;
    throw error;
  }

  // Delete old image if exists
  if (user.avatar_public_id) {
    await Cloudinary.uploader.destroy(user.avatar_public_id);
  }

  if (!fileBuffer) {
    const error = new Error("No file uploaded");
    error.status = 400;
    throw error;
  }

  // Upload image to Cloudinary via stream
  const streamUpload = (buffer) =>
    new Promise((resolve, reject) => {
      const stream = Cloudinary.uploader.upload_stream(
        {
          folder: "Journey/avatars",
          width: 300,
          height: 300,
          crop: "fill",
          gravity: "face",
          quality: "auto",
          fetch_format: "auto",
        },
        (error, result) => {
          if (result) resolve(result);
          else reject(error);
        },
      );
      streamifier.createReadStream(buffer).pipe(stream);
    });

  const result = await streamUpload(fileBuffer);

  // Update user document
  user.avatar = result.secure_url;
  user.avatar_public_id = result.public_id;
  await user.save();

  return {
    url: result.secure_url,
    public_id: result.public_id,
  };
};
