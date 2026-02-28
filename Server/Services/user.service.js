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

export const followUserService = async (userId, targetUserId) => {
  if (!userId || !targetUserId) {
    const error = new Error("User ID is required");
    error.status = 400;
    throw error;
  }

  const user = await UserModel.findById(userId).select(
    "-password -avatar_public_id -resetPasswordToken -resetPasswordExpire",
  );
  const targetUser = await UserModel.findById(targetUserId).select(
    "-password -avatar_public_id -resetPasswordToken -resetPasswordExpire",
  );

  const isFollowing = user.following.includes(targetUserId);
  if (isFollowing) {
    // Unfollow logic
    user.following.pull(targetUserId);
    targetUser.followers.pull(userId);
  } else {
    user.following.push(targetUserId);
    targetUser.followers.push(userId);
  }
  await user.save();
  await targetUser.save();

  return user;
};
