// Server
require("dotenv").config();
const path = require("path");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
const moviesrouter=require("./routes/movies")
const userrouter = require('./routes/users');
app.use(express.urlencoded({extended:true}));
app.use(express.json());

// Serve static files from the 'frontend' directory
app.use(express.static(path.join(__dirname, 'frontend')));
// Use the movies router for specific routes
app.use('/movies', moviesrouter);

// Use the user router for specific routes
app.use('/', userrouter);
app.use('/login', userrouter);
app.use('/registration', userrouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Internal Server Error");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use((req, res, next) => {
  console.log(`Received a request for ${req.url}`);
  next();
});

