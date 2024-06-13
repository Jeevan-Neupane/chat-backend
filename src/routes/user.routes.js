import { Router } from "express";
import { verifyToken } from "../middleware/auth.middleware.js";
import { searchUser, updateLatestChatId } from "../controllers/user.controller.js";
const router = Router();

router.get("/:search", verifyToken, searchUser);

router.put("/updateLatestChatId", verifyToken, updateLatestChatId);



export default router;