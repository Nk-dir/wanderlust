const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {validateReview,isLoggedIn,isReviewAuthor} = require("../middleware");

const reviewController = require("../controllers/review");


// Review
// New Route

router.post("/",isLoggedIn,validateReview,wrapAsync(reviewController.createReview));


// delete review

router.delete("/:reviewId",isReviewAuthor,wrapAsync(reviewController.deleteReview));


module.exports = router;