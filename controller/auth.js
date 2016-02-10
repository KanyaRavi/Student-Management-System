var mongoose = require('mongoose');
var path = require('path');
var bodyParser = require('body-parser');
var Student = require('../models/student');
var Staff = require('../models/staff');
var error = require('../helpers/error.js');



exports.signupstudent = function(req, res, next){
  var registeringStudent = req.body.student;

  if(typeof registeringStudent.phone == 'undefined' || registeringStudent.phone == ''){
  res.status(400).send('phone is missing');
  return next();
} else {
  var phone = registeringStudent.phone;
  if(phone.substr(0, 3) != '+91' && phone.split(phone.substr(0, 3))[1].length != 10) {
    res.status(400).send('Phone number should belong to India.');
    return next();
  }
}

if(typeof registeringStudent.email == 'undefined' || registeringStudent.email == ''){
    res.status(400).send('email is missing');
    return next();
  }

if(typeof registeringStudent.rollNo == 'undefined' || registeringStudent.rollNo == ''){
res.status(400).send('rollno is missing');
return next();
}

  Student.findOne({'phone': registeringStudent.phone}, function(err, student){
    if(err){
    res.status(400).send('error lookingup phone');
    return next(); }
    if(student){
      res.status(400).send('phone already exists');
      return next();
    } else if(!student){
      Student.findOne({'email': registeringStudent.email}, function(err, student){
        if(err){
        res.status(400).send('error lookingup email');
        return next(); }
        if(student){
          res.status(400).send('email already exists');
          return next();
        } else if(!student){
          registeringStudent.status = 'Active';
          Student.create(registeringStudent, function(err, loggedInStudent){
            if(err) error.processError(err, req, res);
            if(!loggedInStudent){
              res.status(400).send('error saving in student');
              return next();
            }
            if(loggedInStudent){
              loggedInStudent.save(function(err, student){
                if(err){
                  res.status(400).send('error logging in student');
                  return next();
                } else if(student){
                  student.password = '';
                  student.updatedAt = '';
                  JSON.stringify(student);
                  res.status(200).send(student);
                  return next();
                }
              });
            }
          });
        }
      });
    }
  });
}

exports.loginstudent = function(req, res, next){
  var student = req.body.student;
  var password = student.password;

  if((typeof student.email == 'undefined' && student.email == '') || (typeof student.phone == 'undefined' && student.phone == '') || (typeof student.rollno == 'undefined' && student.rollno == '')){
      res.status(400).send('login Id is missing');
      return next();
    }



  Student.findOne({ $or:[{'phone': student.phone},{'email': student.email},{'rollNo': student.rollNo}]},function(err,student){
    if(err){
      res.status(400).send('error lookingup student');
      return next();
    } else if(!student) {
      res.status(400).send('No student exists');
      return next();
    } else if(student){
          if (password !== student.password) {
          res.status(400).send('Password is wrong');
          return next();
        } else {
        student.save(function(err, student){
          if(err){
            res.status(400).send('error logging in student');
            return next();
          } else if(student){
            res.status(200).send(student);
            return next();
          }
        });
      }
    }
  });
}

exports.signupstaff = function(req, res, next){
  var registeringStaff = req.body.staff;

  if(typeof registeringStaff.phone == 'undefined' || registeringStaff.phone == ''){
  res.status(400).send('phone is missing');
  return next();
} else {
  var phone = registeringStaff.phone;
  if(phone.substr(0, 3) != '+91' && phone.split(phone.substr(0, 3))[1].length != 10) {
    res.status(400).send('Phone number should belong to India.');
    return next();
  }
}

if(typeof registeringStaff.email == 'undefined' || registeringStaff.email == ''){
    res.status(400).send('email is missing');
    return next();
  }

  Staff.findOne({'phone': registeringStaff.phone}, function(err, staff){
    if(err){
    res.status(400).send('error lookingup phone');
    return next(); }
    if(staff){
      res.status(400).send('phone already exists');
      return next();
    } else if(!staff){
      Staff.findOne({'email': registeringStaff.email}, function(err, staff){
        if(err){
        res.status(400).send('error lookingup email');
        return next(); }
        if(staff){
          res.status(400).send('email already exists');
          return next();
        } else if(!staff){
          registeringStaff.status = 'Active';
          Staff.create(registeringStaff, function(err, loggedInStaff){
            if(err) error.processError(err, req, res);
            if(!loggedInStaff){
              res.status(400).send('error saving in user');
              return next();
            }
            if(loggedInStaff){
              loggedInStaff.save(function(err, staff){
                if(err){
                  res.status(400).send('error logging in user');
                  return next();
                } else if(staff){
                  staff.password = '';
                  staff.updatedAt = '';
                  JSON.stringify(staff);
                  res.status(200).send(staff);
                  return next();
                }
              });
            }
          });
        }
      });
    }
  });
}

exports.loginstaff = function(req, res, next){
  var staff = req.body.staff;
  var password = staff.password;

  if((typeof staff.email == 'undefined' && staff.email == '') || (typeof staff.phone == 'undefined' && staff.phone == '') || (typeof staff.staffid == 'undefined' && staff.staffid == '')){
      res.status(400).send('login Id is missing');
      return next();
    }

  Staff.findOne({ $or:[{'phone': staff.phone},{'email': staff.email},{'staffId': staff.staffid}]}, function(err, staff){
    if(err){
      res.status(400).send('error lookingup user');
      return next();
    } else if(!staff) {
      res.status(400).send('No staff exists');
      return next();
    } else if(staff){
        if (password !== staff.password) {
          res.status(400).send('Password is wrong');
          return next();
        } else {
        staff.save(function(err, staff){
          if(err){
            res.status(400).send('error logging in staff');
            return next();
          } else if(staff){
            res.status(200).send(staff);
            return next();
          }
        });
      }
    }
  });
}
