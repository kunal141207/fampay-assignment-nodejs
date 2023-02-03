require('./models/db');

const express = require('express');

const videoController = require('./controllers/videoController');

var app = express();

app.listen(3000, () => {
    console.log('Express server started at port : 3000');
});

app.use('/video', videoController);