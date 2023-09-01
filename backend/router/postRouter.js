import  Express  from "express";
import {getPost,getUserPosts,likePosts} from '../controllers/postController.js'

const router=Express.Router();
router.get('/',getPost);
router.get('/:id',getUserPosts)
router.patch('/:id/like',likePosts)
export default router;