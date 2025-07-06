const express = require("express");
require("dotenv").config();
const dbConnect = require("./config/database");
const {cloudinaryConnect} = require("./config/cloudinary");
const Upload = require("./Routers/FileUpload");

const PORT = process.env.PORT || 4000 ;
const app = express();

app.use(express.json());

const fileupload = require("express-fileupload");
app.use(fileupload({
  useTempFiles: true,
  tempFileDir: "/tmp/"
}));


dbConnect();
cloudinaryConnect();
app.use("/api/v1/upload", Upload);
app.listen(PORT,()=>{
    console.log(`I am listening at ${PORT}`);
})