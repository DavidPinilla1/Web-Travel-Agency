const auth=  ()=> {  
	return (req, res, next) => {
		console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);
        if (req.isAuthenticated()) return next();
        else{
            req.flash('warn', 'You should be logged in to access this section')
            res.redirect('/login')
        }
	}
}
module.exports=auth;