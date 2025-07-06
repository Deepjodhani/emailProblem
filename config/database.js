const { error } = require('console');
const mongoose = require('mongoose');
require("dotenv").config();

const dbConnect = (req,res)=>{
    mongoose.connect(
        process.env.MONGO_URL,
        // {
        //     useNewUrlParser: true,
        //     useUnifiedTopology: true
        // }
     )

        .then(()=>{
            console.log("Connection Successfull");
        })

        .catch((error)=>{
            console.log("Some problem in connection");
            console.log(error);
            process.exit(1);
        })
    }

    module.exports = dbConnect;

