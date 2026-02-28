import { asyncHandler } from "../Middlewares/asyncHandler.js";
import { sendResponse } from "../Utils/Response.js";
import {
  getUserByUsernameService,
  updateUserProfileService,
  followUserService,
} from "../Services/user.service.js";

export const getUserByUsername = asyncHandler(async (req, res) => {
  const { username } = req.params;

  const user = await getUserByUsernameService(username);

  sendResponse(res, 200, true, "User fetched successfully", { user });
});

export const updateUserProfile = asyncHandler(async (req, res) => {
  const userId = req.user.userId; // from auth middleware
  const updateData = req.body;

  const updatedUser = await updateUserProfileService(userId, updateData);

  sendResponse(res, 200, true, "Profile updated successfully", {
    user: updatedUser,
  });
});

export const followUser = asyncHandler(async (req, res) => {
  try {
    const userId = req.user.userId;
    const targetUserId = req.params.userId;

    const updatedUser = await followUserService(userId, targetUserId);

    sendResponse(res, 200, true, "User followed successfully", {
      user: updatedUser,
    });
  } catch (error) {
    sendResponse(res, 500, false, "Failed to follow user", {
      error: error.message,
    });
  }
});
