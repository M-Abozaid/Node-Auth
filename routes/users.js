var express = require('express');
var router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/register', function(req, res, next) {
  res.render('register',{
  	'title': 'Register'
  });
});

router.get('/login', function(req, res, next) {
  res.render('login',{
  	'title': 'Login'
  });
});

router.post('/register',function(req,res,next){
		var name= req.body.name;
		var email = req.body.email;
		var username = req.body.username;
		var password = req.body.password;
		var password2 = req.body.password2;


	// check for Image field
	if(req.files.profileimage){
		console.log('uploading File ...');

		// file info 
		var profileImageOriginalName = req.files.profileimage.originalname;
		var profileImageName         = req.files.profileimage.name;
		var profileImageMime         = req.files.profileimage.mimetype;
		var profileImagePath         = req.files.profileimage.path;
		var profileImageExt          = req.files.profileimage.extension;
		var profileImageSize         = req.files.profileimage.size;
	} else {
		// set a default image 
		var profileImageName = 'noimage.jpg';
	}

	// form Validation 
	req.checkBody('name','Name fiels is required').notEmpty();
	req.checkBody('email','Email fiels is required').notEmpty();
	req.checkBody('email','Email not valid ').isEmail();
	req.checkBody('username','username fiels is required').notEmpty();
	req.checkBody('password','Password fiels is required').notEmpty();
	req.checkBody('password2','Passwords Do not match').equals(req.body.password);

	// Error Checking 
	var errors = req.validationErrors();
	if(errors){
		res.render('register',{
			errors: errors,
			name: name,
			email: email,
			username: username,
			password: password,
			password2: password2,
		})
	}else {
		var newUser = new User({
			name: name,
			email: email,
			username: username,
			password: password,
			profileImageName
		});

		// Create User
		//User.createUser(newUser,function(err, user){
		//	if(err)  throw err;
		//	console.log(user);
		//});

		// Success Message
		res.flash('success', 'You are now registered and may log in');
		res.location('/');
		res.redirect('/');

	}

});
module.exports = router;
