const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const fileSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
    },
    imageUrl:{
        type:String,
    },
    email:{
        type:String
    },
    tags:{
        type:String
    },
     videoUrl: {
    type: String
  }
});

module.exports = mongoose.model("File", fileSchema); 



fileSchema.post("save", async function(doc){
    try {
        console.log("DOC " ,doc);

        let transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS
            }
        });


        let info = await transporter.sendMail({
            from:`Deep Jodhani`,
            to: doc.email,
            subject: `Learning something new`,
            html: `<h2>Hello Bhaiya</h2> <p> View file here  <a href = "${doc.imageUrl}">${doc.imageUrl}</a> </p>`
        });

    } catch (error) {
        console.error("There is error", error);
        }
    });