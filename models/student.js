var mongoose = require('mongoose');

var statustypes = ["Active","Inactive"];

var studentSchema = new mongoose.Schema({
  name      : {type: String, required: true},
  rollNo    : {type: Number, required: true,unique: true},
  _password  : {type: String, required: true},
  phone     : {type: String, required: true,unique: true},
  bloodGroup : {type: String},
  doorNo : {type: String},
  street : {type: String},
  city : {type: String},
  state : {type: String},
  pincode : {type: String},
  email     : {type: String, required: true,unique: true},
  dob       : {type: Date},
  deptId    : {type: mongoose.Schema.Types.ObjectId, ref:'dept'},
  status    : {type:String,enum:statustypes},
  createdAt : {type: Date,default: Date.now},
  updatedAt : {type: Date},
}, {collection : 'student'});

var Student =  mongoose.model('student',studentSchema);
module.exports = Student;
