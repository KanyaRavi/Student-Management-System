var mongoose = require('mongoose');

var semester = ["sem1","sem2","sem3","sem4","sem5","sem6","sem7","sem8"];
var testType = ["test1","test2","model","semester"];
var dept     = ["ece","eee","cse","it"];

var studentSchema = new mongoose.Schema({
  name      : {type: String, required: true},
  regNo     : {type: Number, required: true},
  password  : {type: String, required: true},
  batch     : Number,
  phone     : {type: Number, required: true},
  address   : String,
  email     : {type: String, required: true},
  dob       :  Date,
  createdAt : Date,
  updatedAt : Date,
  parentnum : {type: Number, required: true},
  result : String,
  total : Number,
  percentage : Number
}, {collection : 'student'});

var Student =  mongoose.model('student',studentSchema);
module.exports = Student;
