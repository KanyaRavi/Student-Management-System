var authController = require('./controller/auth.js');
var updateController = require('./controller/update.js');

module.exports = function(app){
  app.post('/api/student/signupstudent', authController.signupstudent);
  app.post('/api/student/loginstudent', authController.loginstudent);
  app.post('/api/staff/signupstaff', authController.signupstaff);
  app.post('/api/staff/loginstaff', authController.loginstaff);
  app.post('/api/student/updatestudent',updateController.updatestudent);
  app.post('/api/staff/updatestaff',updateController.updatestaff);

}
