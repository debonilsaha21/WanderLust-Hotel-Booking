const User = require("../models/user.js");

module.exports.renderSignupForm = (req, res) => {
    res.render("./users/signup.ejs");
};

module.exports.createUser = async (req, res) => {
    try {
        let { user } = req.body;
        const newUser = new User({ email: user.email, username: user.username });
        const registeredUser = await User.register(newUser, user.password);
        // console.log(registeredUser);
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "User Registered");
            res.redirect("/listings");
        })

    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup")
    }
};

module.exports.renderLoginForm = (req, res) => {
    res.render("./users/login.ejs");
};

module.exports.userLogin = async (req, res) => {
    req.flash("success", "Welcome Back!!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

module.exports.userLogout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            next(err)
        } else {
            req.flash("success", "You are logged Out!");
            res.redirect("/listings");
        }
    })
};