const Listing = require("./models/listing");
const Review = require("./models/review");
const { reviewSchema } = require("./schema.js");
const ExpressError = require("./utils/ExpressError");

function isLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "Please Log-in!!");
        return res.redirect("/login");
    } else {
        next();
    }
}

function saveRedirectUrl(req, res, next) {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

async function isOwner(req, res, next) {
    let { id } = req.params;
    let listing = await Listing.find(id);
    if (!listing.owner._id.equals(res.locals.currUser._id)) {
        req.flash("error", "You don't have access to Edit!!")
        res.redirect(`/listings/${ id }`)
    }
    next();
}

async function isReviewAuthor(req, res, next) {
    let { id, reviewId } = req.params;
    let review = await Review.findById(reviewId);
    if (review.author._id.equals(res.locals.currUser._id)) {
        req.flash("error", "You are not the author of Review!!");
        return res.redirect(`/listings/${ id }`);
    }
    next();
};

//function for middleware which will validate the schema listing
const validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body); //using joi package from schema.js
    if (error) {
        throw new ExpressError(400, error)
    } else {
        next();
    }
};

//function for middleware which will validate the schema review
const validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body); //using joi package from schema.js
    if (error) {
        throw new ExpressError(400, error)
    } else {
        next();
    }
};

module.exports = {
    isLoggedIn,
    saveRedirectUrl,
    isOwner,
    isReviewAuthor,
    validateListing,
    validateReview,
};