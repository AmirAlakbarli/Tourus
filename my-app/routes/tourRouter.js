const express = require("express");
const router = express.Router();
// const reviewController = require("../controllers/reviewController");
const tourController = require("../controllers/tourController");
const { setHeaderQuery } = require("../middlewares/top3tours");
const { privateRoute, access } = require("../middlewares/privateRoute");
const reviewRoute = require("./reviewRouter");

//! Routes:

//! Get all tours
router.get("/", tourController.getAllTours);

//! Get statistics
router.get("/statistics", tourController.getStatistics);

//! Get tour stats
router.get("/tour-stats/:year", tourController.getTourStats);

//! Get top 3 tours
router.get("/top-3", setHeaderQuery, tourController.getAllTours);

//! Get tour by id
router.get("/:id", tourController.getTourById);

//! add tour
router.post("/", privateRoute, tourController.createTour);

//! update tour
router.patch(
  "/:id",
  privateRoute,
  access("admin", "guide"),
  tourController.updateTour
);

//! delete tour
router.delete("/:id", privateRoute, access("admin"), tourController.deleteTour);

// router.get(
//   "/:tourId/reviews",
//   privateRoute,
//   reviewController.getReviewsByTourId
// );

//! get reviews bu tourId
router.use("/:tourId/reviews", reviewRoute);

module.exports = router;
