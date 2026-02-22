import { asyncHandler } from "../Middlewares/asyncHandler.js";
import { sendResponse } from "../utils/response.js";
import { searchUsersService } from "../Services/search.service.js";

export const searchUsers = asyncHandler(async (req, res) => {
  const { q } = req.query;

  if (!q) {
    return sendResponse(res, 400, false, "Search query is required");
  }

  const users = await searchUsersService(q);

  sendResponse(res, 200, true, "Search results fetched successfully", {
    users,
  });
});
