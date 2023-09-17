const path = require("path");
const express = require("express");
const router = express.Router();

// Get requests for the pages
const frontendPath = path.join(__dirname, '..', 'frontend');

router.get('/', (req, res) => {
   let filePath = path.join(frontendPath, 'html', 'home.html');

    // Send the file
    res.sendFile(filePath);
});

router.get('/login.html', (req, res) => {
    let filePath = path.join(frontendPath, 'html', 'login.html');

    // Send the file
    res.sendFile(filePath);
});

router.get('/registration.html', (req, res) => {
   let filePath = path.join(frontendPath, 'html', 'registration.html');

    // Send the file
    res.sendFile(filePath);
});

module.exports = router;
