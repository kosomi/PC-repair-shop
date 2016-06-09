var express = require('express');
var router = express.Router();
var fs = require('fs');
var nodemailer = require('nodemailer');

fs.readFile('./json/services.json', function(err, data){
	if(err){
		throw err
	} else {
		services = JSON.parse(data);
	}
})
 

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'home' });
});

 
router.get('/moon', function(req, res, next) {
  res.render('moon', { title: 'moon' });
});

 
router.get('/articles', function(req, res, next) {
  res.render('articles', { title: 'articles',
  						   services: services });
});

 
router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'contact' });
}); 

router.post('/send', function (req, res) {
    // res.send('Form Submitted');
	var transporter = nodemailer.createTransport({
	    service: "Mailgun",
	    auth: {
	        user: "postmaster@sandbox9487e25e569a4b72a9b7ac0a7d060f6c.mailgun.org" ,
	        pass: "794b30cd39fd1f0286e1ac797cb2b1ec"
	    }
	});

    var mailOptions = {
        from: req.body.email,
        to: 'natetakeout@gmail.com, kosomi@yahoo.com',
        subject: req.body.name + '  website submission',
        text: 'you have a submission with folloing details Name: '+req.body.name+' Email:'+req.body.email+' Message:'+req.body.message,
        html: '<h1>Hello World</h1>\n<p>Name: '+req.body.name+' Email:'+req.body.email+' Message:'+req.body.message+'</p>'
    }

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return console.log(error);
            res.redirect('/');
        }
        console.log('message sent:'+info.response)
        res.redirect('/moon');
    })
})


module.exports = router; 
