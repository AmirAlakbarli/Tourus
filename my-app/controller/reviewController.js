const asyncCatch = require("../utils/asyncCatch");
const GlobalError = require("../error/GlobalError");
const Review = require("../models/review");
const { deleteOne } = require("../utils/factory");

exports.getAllReviews = asyncCatch(async (req, res, next) => {
  const reviews = await Review.find();
  res.status(200).json({ success: true, data: { reviews } });
});

exports.getReviewsByTourId = asyncCatch(async (req, res, next) => {
  const tourId = req.params.tourId;
  console.log(req.params);

  const reviews = await Review.find({ tour: tourId });
  res.status(200).json({ success: true, data: { reviews } });
});

exports.createReview = asyncCatch(async (req, res, next) => {
  const review = await Review.create({
    ...req.body,
    tour: req.params.tourId,
    creator: req.user._id,
  });
  
  res.status(200).json({ success: true, data: { review } });
});

exports.deleteReview = deleteOne(Review);
