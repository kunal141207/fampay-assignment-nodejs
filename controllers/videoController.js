const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Video = mongoose.model('Video');


router.get('/', (req, res) => {
    getVideos(req, res);
});


function getVideos(req, res) {
    return
}

module.exports = router;