module.exports = {
  mongo: undefined,
  init: function () {
    const { config } = require('./config');
    const mongoose = require('mongoose');
    mongoose.connect(config.MONGODB_SERVER, { useNewUrlParser: true });
    this.mongo = mongoose;
    console.log('... Mongo Database Connected');
    return;
  },
  disconnect: function () {
    if (this.mongoose) {
      this.mongoose.connection.close();
    }
  },
};