const passport = require("passport");
const validator = require("validator");
const pool = require('../config/database');
const bcrypt = require('bcryptjs')
const { v4: uuidv4 } = require('uuid');
// uuidv4(); 

const createUser = async (id, name, email, password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    
    const data = await pool.query(
    "INSERT INTO users(id, name, email, password) VALUES ($1, $2, $3, $4) RETURNING id, name, email, password",
    [id, name ,email, hash]
    );
    console.log(data)
    if (data.rowCount == 0) return false;
    return data.rows[0];
};
const emailExists = async (email) => {
    const data = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
    console.log(data)
    if (data.rowCount == 0) return false; 
    return data.rows[0];
    };
exports.getLogin = (req, res) => {
  if (req.user) {
    return res.redirect("/profile");
  }
  res.render("login", {
    title: "Login",
  });
};

exports.postLogin = (req, res, next) => {
  const validationErrors = [];
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: "Please enter a valid email address." });
  if (validator.isEmpty(req.body.password))
    validationErrors.push({ msg: "Password cannot be blank." });

  if (validationErrors.length) {
    // req.flash("errors", validationErrors);
    return res.redirect('/');
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
    //   req.flash("errors", info);
      return res.redirect("/login");
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
    //   req.flash("success", { msg: "Success! You are logged in." });
      res.redirect(req.session.returnTo || "/profile");
    });
  })(req, res, next);
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
  
  if(await emailExists(req.body.email)){
    return res.redirect('/')
  }else{
    const id = uuidv4();
    createUser( id, req.body.name, req.body.email, req.body.password)
    res.redirect('/user/profile')
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