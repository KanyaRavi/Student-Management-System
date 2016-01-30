var mongoose = require('mongoose');

var dept     = ["ece","eee","cse","it"];

var eceSchema = new mongoose.Schema({
 mc   : {type: Number},
 ecc  : {type: Number},
 det  : {type: Number},
 cn   : {type: Number},
 vlsi : {type: Number}
});

var eeeSchema = new mongoose.Schema({
 ped   : {type: Number},
 ps  : {type: Number},
 mpmc  : {type: Number},
 ma : {type: Number}
});

var cseSchema = new mongoose.Schema({
 adt : {type: Number},
 wn  : {type: Number},
 pqt : {type: Number},
 ad  : {type: Number},
focp : {type: Number}
});

var itSchema = new mongoose.Schema({
 mpmc  : {type: Number},
 tpde  : {type: Number},
 itc   : {type: Number},
 cns   : {type: Number},
 wsn   : {type: Number}
});

var deptSchema = new mongoose.Schema({
  dept_name = {type:String,enum:dept};
  ece = [eceSchema],
  eee = [eeeSchema],
  cse = [cseSchema],
  it  = [itSchema]
},{collection:'dept'});

var Dept = mongoose.model('dept',deptSchema);
module.exports = Dept;
