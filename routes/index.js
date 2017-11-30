var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");

            // INDEX

router.get("/",function(req, res){
   res.render("landing"); 
});



// =========================
//  Authentication Routes
// =========================

// show register form
router.get("/register", function(req, res) {
    res.render("register");
});

// handle signup logic
router.post("/register", function(req, res) {
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            req.flash("error", err.messge);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to YelpCamp " + req.body.username);    
            res.redirect("/campgrounds");
        });
    });
});

// Show login form
router.get("/login", function(req, res) {
       res.render("login"); 
});

// Handle login logic
router.post("/login",passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}) ,function(req, res) {
    
});

// logout User
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "Sucessfully logged you out !!!");
    res.redirect("/");
    
});

module.exports = router;