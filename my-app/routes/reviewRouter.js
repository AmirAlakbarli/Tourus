const express = require("express");
const router = express.Router();
const reviewController = require("../controller/reviewController");
const { privateRoute } = require("../middleware/privateRoute");

router.get("/", privateRoute, reviewController.getAllReviews);
router.get("/:tourId", privateRoute, reviewController.getReviewsByTourId);
router.post("/", privateRoute, reviewController.createReview);

module.exports = router;
