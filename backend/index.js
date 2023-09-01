import  express  from "express";
import dbConnection from "./configuration/config.js";
import dotenv from "dotenv";
import cors from 'cors';
import helmet from "helmet"
import multer from "multer";
import path from "path";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import morgan from "morgan";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet()); // set HTTP headers to prevent vulnerabilities
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" })); // sets cross-origin-policy middleware to handle creoss origin requests on web page
app.use(morgan("common")); //Morgan is logging middleware from express. Common is predefined log format which contains Requested URL, Response Time etc
app.use(bodyParser.json({ limit: "30mb", extended: true })); // Just like Express.json, which let parse body of the request but with limit
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));// let us parse url encoded data(Form Submission). let us limit the size fo data  
app.use(cors()); // Cross-origin-resource-sharing.. don't allow web pages to direct to other domains than the one which is set for this page. and a security page
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

import { register } from "./controllers/authController.js";
import { createPost }  from "./controllers/postController.js";
import loginRouter from "./router/loginRouter.js"
import  userrouter  from "./router/userRouter.js"
import postrouter from './router/postRouter.js'
import { verifyToken } from "./middleware/auth.js";

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      return cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
      return cb(null, file.originalname);
    },
  });
  const upload = multer({ storage });
  dotenv.config();
  dbConnection();
  const PORT=process.env.PORT || 1000;
  app.use(cors());
  // -------------Registering Auth with jwt-----------
  app.post('/auth/register',upload.single("picture"),register);
  app.post('/post',upload.single('picture'),createPost);
  // -----------------loginUser--------------
app.use('/auth',loginRouter);
app.use("/users",userrouter); 
app.use("/posts",postrouter);

app.listen(4001,()=>{ 
  console.log("i am connected")
})
