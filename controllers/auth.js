const passport = require('passport')
const validator = require("validator");

exports.getLogin = (req, res) => {
  if (req.user) {
    return res.redirect("/user/profile");
  }
  res.render("login", {
    title: "Login",
  });
};

exports.postLogin = 
  // const validationErrors = [];
  // if (!validator.isEmail(req.body.email))
  //   validationErrors.push({ msg: "Please enter a valid email address." });
  // if (validator.isEmpty(req.body.password))
  //   validationErrors.push({ msg: "Password cannot be blank." });

  // if (validationErrors.length) {
  //   return res.redirect("/login");
  // }
  // req.body.email = validator.normalizeEmail(req.body.email, {
  //   gmail_remove_dots: false,
  // });
  passport.authenticate('login', {
    failureRedirect: '/',
    successRedirect: '/user/profile'
  })
  // , (req, res) => {
  //   console.log('rendering profile')
  //   res.render('profile.ejs', {user: req.user})
  // };


exports.logout = (req, res) => {
  req.logout();
  req.session.destroy((err) => {
    if (err)
      console.log("Error : Failed to destroy the session during logout.", err);
    req.user = null;
    res.redirect("/");
  });
};



exports.getSignup = (req, res) => {
  if (req.user) {
    return res.redirect("/user/profile");
  }
  res.render("signup", {
    title: "Create Account",
  });
};

exports.postSignup = 
  // const validationErrors = [];
  // if (!validator.isEmail(req.body.email))
  //   validationErrors.push({ msg: "Please enter a valid email address." });
  // if (!validator.isLength(req.body.password, { min: 8 }))
  //   validationErrors.push({
  //     msg: "Password must be at least 8 characters long",
  //   });
  // if (req.body.password !== req.body.confirmPassword)
  //   validationErrors.push({ msg: "Passwords do not match" });

  // if (validationErrors.length) {
  //   req.flash("errors", validationErrors);
  //   return res.redirect("../signup");
  // }
  // req.body.email = validator.normalizeEmail(req.body.email, {
  //   gmail_remove_dots: false,
  // });

  passport.authenticate('signup', {
    failureRedirect: '/',
    successRedirect: '/user/profile'
  });

  exports.updatePass = 
    passport.authenticate("updatePassword", {
      failureRedirect: '/',
      successRedirect: '/user/profile'
    });
