const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const MO_Model = require("../schemas/movies");

// Connect to MongoDB Atlas
// Example code for connecting to MongoDB
mongoose.connect(process.env.URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log("Connected to MongoDB Atlas");
    console.log("Using database:", mongoose.connection.name);
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB Atlas:", error);
  });

  //Get movies
router.get("/", async (req, res) => {
  try {
    const movies = await MO_Model.find({});
    res.send(movies);
  } catch (error) {
    console.error("Error fetching movies:", error);
    res.status(500).send("Internal Server Error");
  }
});

//Post new Movie
router.post("/", async (req, res) => {
  try {
    const body = req.body;
    const newM = new MO_Model({
      title: body.title,
      description: body.description,
      actors: body.actors,
      release_year: body.release_year,
    });
    await newM.save(); // Use await to ensure the document is saved before responding
    res.send(newM);
  } catch (error) {
    console.error("Error creating movie:", error);
    res.status(500).send("Internal Server Error");
  }
});
//update a movie by title
router.put("/:title", async (req, res) => {
  try {
    const movieTitle = req.params.title;
    const body = req.body;

    // Use Mongoose's findOneAndUpdate to update the movie by its title
    const updatedMovie = await MO_Model.findOneAndUpdate(
      { title: movieTitle },
      {
        title: body.title,
        description: body.description,
        actors: body.actors,
        release_year: body.release_year,
      },
      { new: true } // This option returns the updated document
    );

    if (!updatedMovie) {
      return res.status(404).send("Movie not found");
    }

    res.send(updatedMovie);
  } catch (error) {
    console.error("Error updating movie:", error);
    res.status(500).send("Internal Server Error");
  }
});

//Delete by title
router.delete("/:title", async (req, res) => {
    try {
      const movieTitle = req.params.title;
  
      // Use Mongoose's findOneAndRemove to delete the movie by its title
      const deletedMovie = await MO_Model.findOneAndRemove({ title: movieTitle });
  
      if (!deletedMovie) {
        return res.status(404).send("Movie not found");
      }
  
      res.send(deletedMovie);
    } catch (error) {
      console.error("Error deleting movie:", error);
      res.status(500).send("Internal Server Error");
    }
  });
  

module.exports = router;
