var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var flash = require("connect-flash");
var passport = require("passport");
var localStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
var methodOverride = require("method-override");
var seedDB = require("./seed");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var User = require("./models/user");

// requiring routes
var campgroundRoutes = require("./routes/campgrounds")
var commentRoutes = require("./routes/comments")
var indexRoutes = require("./routes/index")

// seedDB(); Seeding the database with fake post

mongoose.connect("mongodb://localhost/yelp-camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

app.use(require("express-session")({
    secret: "this is yelp_camp app",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use(campgroundRoutes);
app.use(commentRoutes);
app.use(indexRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp Server has Started !!");
});