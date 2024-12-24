import axios from "axios"
import fs from "fs";
import {Jimp} from "jimp";


// filterImageFromURL
// helper function to download, filter, and save the filtered image locally
// returns the absolute path to the local image
// INPUTS
//    inputURL: string - a publicly accessible url to an image file
// RETURNS
//    an absolute path to a filtered image locally saved file
export async function filterImageFromURL(inputURL) { 
  return new Promise(async (resolve, reject) => {  
    console.log('Entered utils::filterImageFromURL()')
    try {
      const photoBuffer = await axios.get(inputURL,{responseType: "arraybuffer"});      
      console.log("filterImageFromURL ===> 1");
      const photo = await Jimp.read(Buffer.from(photoBuffer?.data,"binary"));      
      console.log("filterImageFromURL ===> 2");
      const outpath = "/tmp/filtered." + Math.floor(Math.random() * 2000) + ".jpg";
      console.log("filterImageFromURL ===> 3");
      console.log(`Output path generated ===> ${outpath}`);
      console.log("filterImageFromURL ===> 4");    
      await photo      
        //.resize(256, 256) // resize
        //.quality(60) // set JPEG quality
        .greyscale() // set greyscale
        .write(outpath)

      resolve(outpath);
      console.log(`AFTER PHOTO PRINTING OUTPATH ${outpath}`);
      console.log("filterImageFromURL ===> 5");
      
    } catch (error) {      
      console.error(error);
      reject(error);
    }
  });
}

// deleteLocalFiles
// helper function to delete files on the local disk
// useful to cleanup after tasks
// INPUTS
//    files: Array<string> an array of absolute paths to files
 export async function deleteLocalFiles(files) {
  return new Promise(async (resolve, reject) => { 
    let filePath;
    for (let file of files) {
    console.log(`deleteLocalFiles===> ${file}`);
    try{
      fs.unlinkSync(file); 
      filePath = file;     
    } catch (error) {      
      //reject(error);      
      console.error(error);
      reject(error);
    }    
  }
  resolve(`deleteLocalFiles===> ${filePath}`);
});
}
