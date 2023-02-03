const mongoose = require('mongoose');

var videoSchema = new mongoose.Schema({
    title: {
        type: String
    },
    url: {
        type: String
    }
});

mongoose.model('Video', videoSchema);