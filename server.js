import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util.js';
//import filterImageFromURL from './util/util.js';
//import deleteLocalFiles from './util/util.js';
import {router as pictureRoutes} from './routes/pictureRoutes.js'



  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());
  app.use(express.urlencoded({ extended: true })) //for requests from forms-like data

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

    /**************************************************************************** */

  //! END @TODO1
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async (req, res) => {
    //res.send("try GET /filteredimage?image_url={{}}")
    res.send("Welcome to Picture Routing Software...")
    console.log("DKTEST ==> HELLO WORLD...");

  } );
  
  app.get('/hello', (req, res) => {
    console.log("Hi from hello end point")
    res.send('Hello world from the server!');
  });

  app.use(pictureRoutes)

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
