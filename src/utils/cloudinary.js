import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"
import { fileURLToPath } from 'url';

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary= async (localFilePath)=>{
    try {
        if (!localFilePath) return null;

       const response = await cloudinary.uploader.upload(localFilePath,{resource_type:'auto'});
       
       console.log("File uploaded successfully URL:",response.url);
       console.log(response);
       
       return response;

    } catch (error) {
        console.log("Error in file upload :",error);
        // delete file form server
        fs.unlink(fileURLToPath);
        return null;
    }
}

export {uploadOnCloudinary};
