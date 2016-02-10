var mongoose = require('mongoose');
var path = require('path');
var bodyParser = require('body-parser');
var Student = require('../models/student');
var Staff = require('../models/staff');
var error = require('../helpers/error.js');

exports.updatestudent = function(req, res, next){
  var name = req.body.name;
  var rollNo = req.body.rollNo;
  var phone = req.body.phone;
  var bloodGroup = req.body.bloodGroup;
  var doorNo = req.body.doorNo;
  var street = req.body.street;
  var city = req.body.city;
  var state = req.body.state;
  var pincode = req.body.pincode;
  var email = req.body.email;
  var dob = req.body.dob;
  var deptId = req.body.deptId;
  var id = req.body._id;

  Student.findById(id, function(err, student) {
   if(err) return next(err);
   student.name = name;
   student.rollNo = rollNo;
   student.phone = phone;
   student.bloodGroup = bloodGroup;
   student.doorNo = doorNo;
   student.street = street;
   student.city = city;
   student.state = state;
   student.pincode = pincode;
   student.email = email;
   student.dob = dob;
   student.deptId = deptId;
   student.save(function(err, student) {
     if(err) next(err);
       res.status(200).send(student);
       return next();
     });
   });
}

exports.updatestaff = function(req, res, next){
  var name = req.body.name;
  var staffId = req.body.staffId;
  var phone = req.body.phone;
  var doorNo = req.body.doorNo;
  var street = req.body.street;
  var city = req.body.city;
  var state = req.body.state;
  var pincode = req.body.pincode;
  var email = req.body.email;
  var dob = req.body.dob;
  var deptId = req.body.deptId;
  var id = req.body._id;

  Staff.findById(id, function(err, staff) {
   if(err) return next(err);
   staff.name = name;
   staff.rollNo = rollNo;
   staff.phone = phone;
   staff.bloodGroup = bloodGroup;
   staff.doorNo = doorNo;
   staff.street = street;
   staff.city = city;
   staff.state = state;
   staff.pincode = pincode;
   staff.email = email;
   staff.dob = dob;
   staff.deptId = deptId;
   staff.save(function(err, staff) {
     if(err) next(err);
       res.status(200).send(staff);
       return next();
     });
   });
}
