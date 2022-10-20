const asyncCatch = require("../utils/asyncCatch");
const GlobalError = require("../errors/GlobalError");
const Review = require("../models/review");
const { deleteOne } = require("../utils/factory");

// exports.getAllReviews = asyncCatch(async (req, res, next) => {
//   console.log("all");
//   const reviews = await Review.find();
//   res.status(200).json({ success: true, data: { reviews } });
// });

// exports.getReviewsByTourId = asyncCatch(async (req, res, next) => {
//   const tourId = req.params.tourId;
//   const reviews = await Review.find({ tour: tourId });
//   res.status(200).json({ success: true, data: { reviews } });
// });

//! merging of getAllReviews and getReviewsById
exports.getReviews = asyncCatch(async (req, res, next) => {
  const tourId = req.params.tourId;
  if (tourId) {
    const reviews = await Review.find({ tour: tourId });
    res.status(200).json({ success: true, data: { reviews } });
  } else {
    const reviews = await Review.find();
    res.status(200).json({ success: true, data: { reviews } });
  }
});

exports.createReview = asyncCatch(async (req, res, next) => {
  const newReview = await Review.create({
    ...req.body,
    tour: req.params.tourId,
    creator: req.user._id,
  });

  if (!newReview) return new GlobalError("Review cannot be created!");

  res.status(200).json({ success: true, data: { newReview } });
});

exports.deleteReview = deleteOne(Review);
