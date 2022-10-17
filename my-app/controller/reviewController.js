const asyncCatch = require("../utils/asyncCatch");
const GlobalError = require("../error/GlobalError");
const Review = require("../models/review");

exports.getAllReviews = asyncCatch(async (req, res, next) => {
  const reviews = await Review.find()
  res.status(200).json({ success: true, data: { reviews } });
});

exports.getReviewsByTourId = asyncCatch(async (req, res, next) => {
  const tourId = req.params.tourId;

  const reviews = await Review.find({ tour: tourId }).populate("creator");
  res.status(200).json({ success: true, data: { reviews } });
});

exports.createReview = asyncCatch(async (req, res, next) => {
  const review = await Review.create(req.body);
  res.status(200).json({ success: true, data: { review } });
});