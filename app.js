require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require('mongoose');
const path = require("path");
const methodOverride = require('method-override')
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError");
const listingRouter = require("./routes/listing.js");    //express router
const reviewRouter = require("./routes/review.js");     //express router
const userRouter = require("./routes/user.js");         //express router
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
//auth
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

//middlewares
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
//we are using method_override
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, "/public")));
app.engine('ejs', ejsMate);

const db_url = process.env.ATLASDB_URL;
//mongo connection
async function main() {
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(db_url);
    } else {
        console.log("MongoDB already connected");
    }
}
main()
    .then((res) => { console.log("Mongodb connected") })
    .catch(err => console.log(err));
//root
app.get("/", (req, res) => {
    res.send("this is root");
});

//mongo store options 
const store = MongoStore.create({
    mongoUrl: db_url,
    crypto: {
        secret: process.env.SECRET,
    },
    touchAfter: 24 * 60 * 60,
});
store.on("error", () => {
    console.log("Error in Mongo-session Store", err)
});

//express-sessions
const sessionOptions = {
    store: store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    }
};



app.use(session(sessionOptions)); //middleware
app.use(flash());                   //middleware

//authentication----------------------------------------------------------------#
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//middleware to send information to all the routes
app.use((req, res, next) => {
    res.locals.successMsg = req.flash("success");
    res.locals.errorMsg = req.flash("error");
    res.locals.currUser = req.user;     //sending user info object on every route
    next();
});// we are sending this variable to every route

//express router for listings
app.use("/listings/:id/reviews", reviewRouter);
app.use("/listings", listingRouter);
app.use("/", userRouter);




//page not found error when request is on our domain on random
app.use((req, res, next) => {
    next(new ExpressError(404, "Page not Found!"));
});

//middleware to catch errors // global error handler
app.use((err, req, res, next) => {
    const { statusCode = 500, message = "Something Went Wrong" } = err;
    res.render("./listings/error.ejs", { statusCode, message });
    // res.status(statusCode).send(message);
});






//starting the server
app.listen(8080, () => { console.log("Server Connected") });