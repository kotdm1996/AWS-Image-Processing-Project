import express from "express";
import {filterImageFromURL,deleteLocalFiles} from '../util/util.js';

export const router = express.Router();

// Create filter Image
// GET /filteredimage?image_url={{URL}}
// endpoint to filter an image from a public url.
// /:image_url

  // REMOVE AUTH FROM EXAMPLE
router.get( '/filteredimage/', async (req, res) => {
    // destruct request body
    let {image_url} = req.query;
    let localFilePathToDelete;
    console.log('routes/pictureRoutes()::GET::/filteredimage/:image_url');
    console.log(`received ==>${image_url}`);

    if(!image_url){
      return res.status(400).send("Missing required image url!");
    }
    
    
    console.log('before filterImageFromURL(image_url)');    
    
    await filterImageFromURL(image_url).then(localPath => {
      console.log('after filterImageFromURL(image_url)')
    
      console.log('filteredimage ... received file path from utils::filterImageFromURL');
      console.log(localPath); 
      localFilePathToDelete =  localPath;
        res.status(201).sendFile(localPath);       
      }).catch(error => {
        console.error('Received and error'); 
        res.status(404).send(error); //displaying error received when after file was processed
      });
    console.log("AFTER THE WHOLE THING") ;

    //need to delete local file now
    /****
    console.log("DELETING LOCAL FILE NOW") ;
    try {
      const files_to_delete = [localFilePathToDelete];  
      deleteLocalFiles(files_to_delete);
    }
    catch (error) {    
      console.log("deleteimage exception");     
    }
    ****/
});

router.get( '/deleteimage/', async ( req, res ) => {
    // destruct request body
    let {image_path} = req.query;

    console.log('routes/pictureRoutes()::GET::/deleteimage/:image_path');
    console.log(`received ==>${image_path}`);

    if(!image_path){
      return res.status(400).send("Missing required image path!");
    }
    
    try {
      const files_to_delete = [image_path];  
      await deleteLocalFiles(files_to_delete).then(resultMsg => {
        
          res.status(201).send(`File ${image_path} deleted...`);       
        }).catch(error => {
          console.error('Received and error'); 
          res.status(404).send(error); //displaying error received when after file was processed
        });
    }
    catch (error) {    
        console.log("deleteimage exception"); 
        res.status(404).send(error);       
    }
    
} );