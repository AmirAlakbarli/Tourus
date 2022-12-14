const express = require("express");
const router = express.Router({ mergeParams: true });
const reviewController = require("../controllers/reviewController");
const { privateRoute, access } = require("../middlewares/privateRoute");

router.get("/", privateRoute, reviewController.getReviews);
// router.get("/:tourId", privateRoute, reviewController.getReviewsByTourId);
router.post("/", privateRoute, access("user"), reviewController.createReview);

router.delete(
  "/:id",
  privateRoute,
  access("admin", "user"),
  reviewController.deleteReview
);

// router.get(
//   "/:tourId/reviews",
//   privateRoute,
//   reviewController.getReviewsByTourId
// );

module.exports = router;
