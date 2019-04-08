const auth=  ()=> {  
	return (req, res, next) => {
        if (req.isAuthenticated()) return next();
        else{
            req.flash('warn', 'You should be logged in to access this section')
            res.redirect('/login')
        }
	}
}
module.exports=auth;