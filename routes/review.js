const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError");
const { reviewSchema } = require("../schema.js");
const { isLoggedIn, isReviewAuthor, validateReview } = require('../middleware');
const reviewController = require("../controllers/review.js")

//importing the model of database
const Listing = require("../models/listing.js");
const { wrap } = require("module");
const Review = require("../models/review.js");



//post review route-------------------------------------------------------------#
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewController.postReview));
//delete review route--------------------------------------------------#
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(reviewController.deleteReview));

module.exports = router;