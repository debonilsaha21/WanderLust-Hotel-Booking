const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError");
const { listingSchema } = require("../schema.js"); //server side validation with joi schema
const flash = require("connect-flash");
const { isLoggedIn, isOwner, validateListing } = require('../middleware');
const listingController = require("../controllers/listing.js");
//importing the model of database
const Listing = require("../models/listing.js");

//---------------------------------------------------------------------------routes

//index route
router.get("/", wrapAsync(listingController.index));

//create route with get and then post
router.get("/new", isLoggedIn, listingController.renderNewForm);
//this code defines a route in an Express.js server that adds 
// data to a MongoDB database using the Mongoose model Listing.
router.post("/", isLoggedIn, validateListing, wrapAsync(listingController.addListing));

//edit route and put route for updation
router.get("/edit/:id", isLoggedIn, wrapAsync(listingController.renderEditForm));
router.put("/:id", isLoggedIn, isOwner, validateListing, wrapAsync(listingController.editListing));

//show route
router.get("/:id", wrapAsync(listingController.showListing));

//delete route
router.delete("/:id", isLoggedIn, isOwner, wrapAsync(listingController.deleteListing));

module.exports = router;