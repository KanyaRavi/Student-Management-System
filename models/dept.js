var mongoose = require('mongoose');

var deptSchema = new mongoose.Schema({
  departmentName : {type:String}
},{collection:'dept'});

var dept = mongoose.model('dept',deptSchema);
module.exports = dept;
