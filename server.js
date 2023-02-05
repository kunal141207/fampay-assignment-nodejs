const express = require('express');

var app = express();

app.listen(3000, () => {
    console.log('Express server started at port : 3000');
});

const database = require('./db')
database.init()

const modules = require('./src/index')

modules.init(app)