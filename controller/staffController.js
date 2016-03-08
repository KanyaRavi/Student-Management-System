var mongoose = require('mongoose');
var path = require('path');
var bodyParser = require('body-parser');
var Staff = require('../models/staff');
var mail = require('../helpers/mail.js');
var error = require('../helpers/error.js');
var cloudinary = require('cloudinary');
var Semester = require('../models/semester.js');
var Dept = require('../models/dept.js');

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

//Forgot password
exports.forgotPassword = function(req, res, next){
var email = req.params.email;
console.log(email);
Staff.findOne({'email':email}, function(err, user){
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
  Staff.findById(id,function(err,user){
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
 Staff.findById(id,function(err, user){
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

//update staff details
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

//Adding mark
exports.addMark = function(req, res, next){
 var semester = new Semester(req.body);
 semester.save(function(err,semester) {
 if(err) return next(err);
 console.log("mark us added");
  res.send(semester);
  console.log(semester);
 return next();
});
}

//Add Staff
exports.addStaff = function(req, res, next){
  var staff = new Staff(req.body);
  staff.save(function(err,staff) {
  if(err) return next(err);
  console.log("staff us added");
  res.send(staff);
  console.log(staff);
  return next();
});
}

exports.addDept = function(req, res, next){
   var dept = new Dept(req.body);
   dept.save(function(err,dept) {
   if(err) return next(err);
   console.log("dept us added");
   res.send(dept);
   console.log(dept);
  return next();
});
}

//View Profile
exports.viewProfileStaff = function(req,res,next){
  var id = req.params.id;
  Staff.findById(id,function(user){
    if (err) return next(err);
    res.status(200).send(new response(user));
  });
}
