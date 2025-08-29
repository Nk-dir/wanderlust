const User = require("../models/user");



module.exports.renderSignupForm = (req,res) => {
    res.render("users/signup");
}

module.exports.signup = async (req,res) => {
    try {
        const {username,email,password} = req.body;
        const newUser = new User({email,username});
        const registeredUser = await User.register(newUser,password);
        req.login(registeredUser,(err) => {
            if(err) {
                return next(err);
            }
            req.flash("success","Welcome to Wanderlust!");
            res.redirect("/listings");
        })
    } catch (e) {
        req.flash("error",e.message);
        res.redirect("/signup");
    }
}



module.exports.renderLoginForm = (req,res) => {
    res.render("users/login");
}

module.exports.login = async (req,res) => {
    console.log(req.user);
    req.flash("success","successfully logged in");
    res.redirect(res.locals.redirectUrl || "/listings");
}


module.exports.logout = (req,res,next) => {
    req.logout((err) => {
        if(err) {
            return next(err);
        }
        req.flash("success","you are logged out!");
        res.redirect("/listings");
    })
}