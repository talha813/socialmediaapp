import  Express  from "express";
import { getUser,addRemoveFriends,displayFriends } from "../controllers/userController.js";
import { verifyToken } from "../middleware/auth.js";
const router= Express.Router();

router.get('/:id',verifyToken,getUser);
router.patch('/:id/:friendId',verifyToken,addRemoveFriends)
router.get('/:id/friend',displayFriends);
export default router;