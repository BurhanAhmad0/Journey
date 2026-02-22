import { asyncHandler } from "../Middlewares/AsyncHandler.js";
import { sendResponse } from "../Utils/Response.js";
import { uploadProfilePictureService } from "../Services/profile.service.js";

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
