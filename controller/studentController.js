var mongoose = require('mongoose');
var path = require('path');
var bodyParser = require('body-parser');
var Student = require('../models/student');
var mail = require('../helpers/mail.js');
var error = require('../helpers/error.js');
var cloudinary = require('cloudinary');
var Dept = require('../models/dept.js');
var Semester = require('../models/semester.js');

//Signing in
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


//Forgot password
exports.forgotPassword = function(req, res, next){
var email = req.params.email;
console.log(email);
Student.findOne({'email':email}, function(err, user){
  if(err){
    res.status(400).send('Error looking up for email');
    return next();
  } else if(user) {
    mail.sendMail(user.email, 0, user.name, user._id, function(result){
        if(result == 1){
          res.status(400).send('Error sending mail');
          return next();
        } else {
        res.status(200).send('Mail Sent');
        return next();
      }
      });
  } else {
    res.status(400).send('No user found');
    return next();
  }
})

}

//sending the password file
exports.sendPasswordFile = function(req, res, next) {
  var id = req.params.id;
  var link = "http://127.0.0.1:52320/api/forgotpassword/"+id;
  Student.findById(id,function(err,user){
    if(user != null && user != ""){
    console.log(link);
    res.sendFile(path.resolve(__dirname, '../views', 'index.html'));
    return next();
  }
  else {
    res.status(200).send("Sorry ,You are not an authorised user");
    return next();
  }
});
}

//Resetting Password
exports.changePassword = function(req,res,next){
 var id = req.body._id;
 var _password = req.body._password;
 Student.findById(id,function(err, user){
 if(err) return next(err);
 user._password = _password;
 user.save(function(err, user)
   {
    if(err) throw err;
     console.log(user.name);
     res.status(200).send("Password Successfully resetted"+ user._password);
     console.log(user._password);
     return next();
   });
 });
}

//update student details
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

//Add Student

  exports.addStudent = function(req, res, next){
  var student = new Student(req.body);
  student.save(function(err,student) {
   if(err) return next(err);
   console.log("student us added");
   res.send(student);
   console.log(student);
   return next();
});
   }

//View Profile
exports.viewMarkandAttendance = function(req,res,next){
  var id = req.params.id;
  Semester.findById(id,function(data){
    if(err) return next(err);
    res.status(200).send(new response(data));
  });
}


exports.viewProfile = function(req,res,next){
  var id =  req.params.id;
  Student.findById(id,function(user){
    if(err) return next(err) ;
    res.status(200).send(new response(user));
  });
}
