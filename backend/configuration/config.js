import mongoose from "mongoose";
import dotenv from "dotenv"; 
dotenv.config();
const db_URL=process.env.MONGODB_URL;
const dbConnection=async ()=>
{
      try {
          const connect=await mongoose.connect(db_URL);
          console.log("Database is connected at" + connect.connection.host)
          
      } catch (error) {
          console.log("error in connection with database is :"+ error)
      }
}
export default dbConnection;