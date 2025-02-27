import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

export const searchUser = asyncHandler(async (req, res) => {

    console.log("search", req.params.search)

    const keyword = req.params.search
        ? {
            $or: [
                { fullName: { $regex: req.params.search, $options: "i" } },
                { email: { $regex: req.params.search, $options: "i" } },
            ],
        }
        : {};

    const users = await User.find({ ...keyword })
        .find({ _id: { $ne: req.user._id } })
        .select("-password");


    res.send(users);
})


export const updateLatestChatId = asyncHandler(async (req, res) => {

    const { chatId } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
        throw new ApiError(404, "User not found")
    }

    user.recentChatId = chatId;

    await user.save();

    res.send(user);


})