var studentController = require('./controller/studentController.js');
var staffController = require('./controller/staffController.js');

module.exports = function(app){
  
  app.post('/api/student/signupstudent', studentController.signupstudent);
  app.post('/api/student/loginstudent', studentController.loginstudent);
  app.post('/api/staff/signupstaff', staffController.signupstaff);
  app.post('/api/staff/loginstaff', staffController.loginstaff);
  app.post('/api/student/updatestudent',studentController.updatestudent);
  app.post('/api/staff/updatestaff',staffController.updatestaff);
  app.post('/api/staff/addmark', staffController.addMark);
  app.get('/api/student/forgotpassword/:email',studentController.forgotpassword);
  app.get('/api/student/sendfile/:id',studentController.forgotpassword);
  app.post('/api/student/changepassword',studentController.changePassword);
  app.get('/api/staff/forgotpassword/:email',staffController.forgotpassword);
  app.get('/api/staff/sendfile/:id',staffController.forgotpassword);
  app.post('/api/staff/changepassword',staffController.changePassword);
  app.post('/api/staff/addstaff',staffController.addStaff);
  app.post('/api/student/addstudent',studentController.addStudent);
  app.post('/api/staff/adddept',staffController.addDept);
  app.get('/api/student/viewmarkandattendance/:id',studentController.viewMarkandAttendance);
  app.get('/api/student/viewprofile/:id',studentController.viewProfile);
  app.get('/api/staff/viewprofile/:id',staffController.viewProfileStaff)

}
