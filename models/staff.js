var mongoose = require('mongoose');

var semester = ["sem1","sem2","sem3","sem4","sem5","sem6","sem7","sem8"];
var testType = ["test1","test2","model","semester"];
var dept     = ["ece","eee","cse","it"];

var staffSchema = new mongoose.Schema({
  name        : {type: String, required: true},
  staffid     : {type: Number, required: true},
  department  : String,
  desgination : String,
  password    : {type: String, required: true},
  email       : {type: String, required: true},
  address     : String,
  mobile      : Number,
  dob         : Date,
  joinDate    : Date,
  experience  : String,
  createdAt   : Date,
  updatedAt   : Date,
}, {collection: 'staff'});

var Staff = mongoose.model('staff' , staffSchema);
module.exports = Staff;
