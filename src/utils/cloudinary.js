import { v2 as cloudinary } from 'cloudinary';
import fs from "fs" // fs => file system that allows to read write etc..


    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET 
    });
   

const uploadOnCloudinary = async (localFilePath) => {
    try{
        if(!localFilePath) return null

        // upload the file on cloudinary

        const response = await cloudinary.uploader.upload
        (localFilePath, {
            resource_type: "auto"
        })

        // file has been uploaded sucessfully 
       // console.log("file upload on cloudnary", response.url);
       fs.unlinkSync(localFilePath) // remove the locally saved tempoeary file as the upload operation got failed
       return response;

    }catch(error){
        // fs -> to remove file from server 
      // console.error("Cloudinary upload error:", error);
        
        fs.unlinkSync(localFilePath) // remove the locally saved tempoeary file as the upload operation got failed
        return null;
    }
}

export {uploadOnCloudinary}