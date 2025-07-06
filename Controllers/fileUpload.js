const File = require("../Modells/File");
const router = require("../Routers/FileUpload");
const cloudinary = require("cloudinary").v2;

exports.localFilep = async (req, res)=>{
    try {
        const fi = req.files.fi;
        console.log("Here is file" + fi);

        let path = __dirname + "/files/" + Date.now() + `.${fi.name.split('.')[1]}`;
        console.log("Path is:" + path);

        fi.mv(path, (error) => {
    if (error) {
        console.error("File move failed:", error);
    } else {
        console.log("File moved successfully");
    }
});


        res.status(200).json({
            success:true,
            message:"File uploaded Successfully"
        });

    } catch (error) {
        console.log("There is some problem in uploading file");
        console.log(error);
    }
}

function isFileTypeSupported(type,supportedFile){
    return supportedFile.includes(type);
}

async function uploadFileToCloudinary(file, folder, quality){
    const options = {
        folder,
          resource_type: "auto"
    };
    if(quality){
        options.quality = quality;
    }
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}


exports.imageUpload = async (req,res) =>{
    try {
        const {name,email,tags} = req.body;
        console.log(name,email,tags);

        const file = req.files.imgFile;
        console.log(file);

        // ---------------------

        const supportedFile = ["jpg","jpeg"];
        const fileType = file.name.split('.')[1].toLowerCase();
        
        if(!isFileTypeSupported(fileType,supportedFile)){
            return res.status(400).json({
                success: false,
                message:"File not supported"
            })
        }

         const response = await uploadFileToCloudinary(file, "Codehelp");
         console.log(response);

         const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url

         })
         await fileData.save(); // this will trigger the post-save hook


         res.status(200).json({
            message:"image uploaded successfully",
            success:true,
            url: response.secure_url  // Optional: return image URL

         })


    } catch (error) {
        return res.status(400).json({
            success: false,
            message:"Failed to upload the file"
        })
    }
}



// ---------------------------------------------------------------------------------------------------------------------------


// function isFileTypeSupported(type,supportedFile){
//     return supportedFile.includes(type);
// }

// async function uploadFileToCloudinary(file, folder){
//     const options = {folder};
//     return await cloudinary.uploader.upload(file.tempFilePath, options);
// }


exports.videoUpload = async (req,res) =>{
    try {
        const {name,email,tags} = req.body;
        console.log(name,email,tags);

        const file = req.files.vidFile;
        console.log(file);

        // ---------------------

        const supportedFile = ["mp4","mov"];
        const fileType = file.name.split('.')[1].toLowerCase();
        
        if(!isFileTypeSupported(fileType,supportedFile)){
            return res.status(400).json({
                success: false,
                message:"File not supported"
            })
        }

         const response = await uploadFileToCloudinary(file, "Codehelp");
         console.log(response);

         const fileData = await File.create({
            name,
            tags,
            email,
            videoUrl:response.secure_url

         });

         res.status(200).json({
            message:"video uploaded successfully",
            success:true,
            url: response.secure_url  // Optional: return video URL

         })


    } catch (error) {
        return res.status(400).json({
            success: false,
            message:"Failed to upload the file"
        })
    }
}

// ---------------------------------------------------------------------------------------------------------------

exports.imgReducerUp = async (req,res) =>{
    try {
         const {name,email,tags} = req.body;
        console.log(name,email,tags);

        const file = req.files.imgFile;
        console.log(file);

        // ---------------------

        const supportedFile = ["jpg","jpeg"];
        const fileType = file.name.split('.')[1].toLowerCase();
        
        if(!isFileTypeSupported(fileType,supportedFile)){
            return res.status(400).json({
                success: false,
                message:"File not supported"
            })
        }

         const response = await uploadFileToCloudinary(file, "Codehelp",10);
         console.log(response);

         const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url

         }).save();

         res.status(200).json({
            message:"image uploaded successfully",
            success:true,
            url: response.secure_url  // Optional: return image URL

         }) ;

    } catch (error) {
        res.status(400).json({
            success: false,
            message:"Failed to reduce size"
        });
    }
}
