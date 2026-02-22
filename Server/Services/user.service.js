import UserModel from "../Models/UserModel.js";

export const getUserByUsernameService = async (username) => {
  const user = await UserModel.findOne({ username }).select(
    "-password -avatar_public_id -resetPasswordToken -resetPasswordExpire",
  );
  if (!user) {
    const error = new Error("User not found");
    error.status = 404;
    throw error;
  }
  return user;
};

export const updateUserProfileService = async (userId, updateData) => {
  // Exclude password updates here
  const { password, ...safeData } = updateData;

  const updatedUser = await UserModel.findByIdAndUpdate(
    userId,
    { $set: safeData },
    { new: true, runValidators: true },
  ).select("-password");

  if (!updatedUser) {
    const error = new Error("User not found");
    error.status = 404;
    throw error;
  }

  return updatedUser;
};
