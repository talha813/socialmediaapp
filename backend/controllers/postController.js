import Posts from '../models/postModel.js'
import User from '../models/userModel.js';
import { getUser } from './userController.js';
export const createPost=async(req,res)=>
{
     try {
        const {userId,description}=req.body;
        const user=await User.findById(userId);
        const picturePath=req.file.path;
        const post=new Posts({
            userId,
            fName: user.fName,
            lName: user.lName,
            description,    
            location: user.location,
            picturePath,
            userPicturePath: user.picturePath,
            likes: {},
            comments: [],
        })
        const posted=await post.save();
        res.status(200).json(posted);
     } catch (error) {
        res.status(404).json({msg: error});
     }
}
export const getPost=async(req,res)=>
{
     try {
         const post=await Posts.find();
        res.status(404).json(post);
     } catch (error) {
        res.status(404).json({msg: error});

     }
}
export const getUserPosts=async(req,res)=>
{
     try {
         const {id}=req.params;
         const userId=id;
         const usersPosts=await Posts.find({userId});
        res.status(404).json(usersPosts);
     } catch (error) {
        res.status(404).json({msg: error});
     }
}
export const likePosts=async (req,res)=>
{
    try {
        const {id}=req.params
        const {userId}=req.body;
       const post=await Posts.findById(id);
        const isLiked=await post.likes.get(userId);
        if(isLiked)
        {
             post.likes.delete(userId);
        }       
        else
        {
             post.likes.set(userId);
        }
        const updatePost=await post.findByIdAndUpdate(id,{likes: post.likes},{new:true});
       res.status(404).json(updatePost);
    } catch (error) {
       res.status(404).json({msg: error});
    }
}

