import mongoose from "mongoose";
 const Posts=mongoose.Schema({
    userId: 
    {
        type: String,
        required: true,
    },
    fName:
    {
        type: String,
        required: true,
    },
    lName:
    {
        type: String,
        required: true,
    },
    location: String,
    description: String,
    picturePath: String,
    userPicturePath: String,
    likes: {
        type: Map,          // similar to object and takes values in key-value pairs, but 
        of: Boolean         // in this case the keys will be strings and values will be in booleans
    },                      // of represents that the values in the map will be of boolean data types
    comments: {
        type: Array,
        default: []
    },
},
{ timestamps: true });

export default mongoose.model("posts",Posts)