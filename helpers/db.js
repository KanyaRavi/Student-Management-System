var mongoose = require('mongoose');

var db = {
  // Connects to mongoDB
  connect: function(url, options) {
    mongoose.connect(url, options);
    mongoose.connection.on('open', function(){
      console.log("Connected to mongo successfully");
    });

    mongoose.connection.on('disconnect', function(){
      console.log("Mongo disconnected");
    });

    mongoose.connection.on('error',function (err) {
      console.log('Mongoose default connection error: ' + err);
    });

    process.on('SIGINT', function() {
      mongoose.connection.close(function () {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
      });
    });

  }
}

module.exports = db;
