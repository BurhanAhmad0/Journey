import { asyncHandler } from "../Middlewares/AsyncHandler.js";
import { sendResponse } from "../Utils/Response.js";
import { uploadProfilePictureService } from "../Services/profile.service.js";
import UserModel from "../Models/UserModel.js";

export const uploadProfilePicture = asyncHandler(async (req, res) => {
  const userId = req.user.userId;

  if (!req.file) {
    return sendResponse(res, 400, false, "No file uploaded");
  }

  const result = await uploadProfilePictureService(userId, req.file.buffer);

  sendResponse(res, 200, true, "Image uploaded successfully!", {
    url: result.url,
    public_id: result.public_id,
  });
});

export const updateProfileInfo = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { username, bio, gender, account_status } = req.body;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID not found" });
    }

    const user = await UserModel.findById(userId).select(
      "-password -avatar -avatar_public_id",
    );
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (username) user.username = username;
    if (bio) user.bio = bio;
    if (gender) user.gender = gender;
    if (account_status) user.private = account_status;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    console.error("Error updating profile info:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
