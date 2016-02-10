var mongoose = require('mongoose');

var semtype = ["odd","even"];
var semname = ["sem1","sem2","sem3","sem4","sem5","sem6","sem7","sem8"];

var subjectSchema = new mongoose.Schema({
  subName:{type: String},
  subMark:{type: Number},
  attendance:{type: Number},
  result:{type: String},
  percentage:{type: Number}
});

var semesterSchema = new mongoose.Schema({
  studentId:{type: mongoose.Schema.Types.ObjectId, ref:'student'},
  deptId:{type: mongoose.Schema.Types.ObjectId, ref:'dept'},
  semName : {type:String,enum:semname},
  semType: {type:String,enum:semtype},
  subjects:[subjectSchema]
},{collection:'semester'});

var semester = mongoose.model('semester',semesterSchema);
module.exports = semester;
