const mongoose = require("mongoose");

const schema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    actors: { type: Array, required: true },
    release_year: { type: Number, required: true },
});

const MO_Model = mongoose.model("movies", schema);

module.exports = MO_Model;



