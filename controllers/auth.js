const passport = require("passport");
const validator = require("validator");



exports.getLogin = (req, res) => {
  if (req.user) {
    return res.redirect("/profile");
  }
  res.render("login", {
    title: "Login",
  });
};

exports.postLogin = passport.authenticate("local-login", {session: false}),(req, res, next) => {
  // const validationErrors = [];
  // if (!validator.isEmail(req.body.email))
  //   validationErrors.push({ msg: "Please enter a valid email address." });
  // if (validator.isEmpty(req.body.password))
  //   validationErrors.push({ msg: "Password cannot be blank." });

  // if (validationErrors.length) {
  //   // req.flash("errors", validationErrors);
  //   return res.redirect('/');
  // }
  // req.body.email = validator.normalizeEmail(req.body.email, {
  //   gmail_remove_dots: false,
  // });
    console.log('rendering')
    res.json({user: req.user});
  
};

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
    console.log('getting signup')
  if (req.user) {
    return res.redirect("/profile");
  }
  res.render("signup", {
    title: "Create Account",
  });
};

exports.postSignup = async (req, res, next) => {
    console.log('posting signup')
  const validationErrors = [];
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: "Please enter a valid email address." });
  if (!validator.isLength(req.body.password, { min: 8 }))
    validationErrors.push({
      msg: "Password must be at least 8 characters long",
    });
  if (req.body.password !== req.body.confirmPassword)
    validationErrors.push({ msg: "Passwords do not match" });

  if (validationErrors.length) {
    // req.flash("errors", validationErrors);
    console.log(validationErrors)
    return res.redirect("../signup");
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });
  passport.authenticate("local-signup"), (req, res, next) => {
    res.json({user: req.user});
  }
//   User.findOne(
//     { $or: [{ email: req.body.email }, { userName: req.body.userName }] },
//     (err, existingUser) => {
//       if (err) {
//         return next(err);
//       }
//       if (existingUser) {
//         req.flash("errors", {
//           msg: "Account with that email address or username already exists.",
//         });
//         return res.redirect("../signup");
//       }
//       user.save((err) => {
//         if (err) {
//           return next(err);
//         }
//         req.logIn(user, (err) => {
//           if (err) {
//             return next(err);
//           }
//           res.redirect("/profile");
//         });
//       });
//     }
//   );
};