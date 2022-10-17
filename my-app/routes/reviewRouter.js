const express = require("express");
const router = express.Router({ mergeParams: true });
const reviewController = require("../controller/reviewController");
const { privateRoute, access } = require("../middleware/privateRoute");

router.get("/", privateRoute, reviewController.getReviewsByTourId);
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
