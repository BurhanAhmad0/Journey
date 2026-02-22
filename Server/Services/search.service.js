import UserModel from "../Models/UserModel.js";

export const searchUsersService = async (query) => {
  if (!query) return [];

  // Case-insensitive regex search
  const regex = new RegExp(query, "i");

  const users = await UserModel.find({
    $or: [{ username: regex }, { firstName: regex }, { lastName: regex }],
  }).select("_id username firstName lastName avatar");

  return users;
};
