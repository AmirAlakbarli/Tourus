const express = require("express");
const router = express.Router();

const tourController = require("../controller/tourController");
const {setHeaderQuery} = require("../middleware/top3tours");

//! Routes:

//! Get all tours
router.get("/", tourController.getAllTours);

//! Get top 3 tours
router.get("/top-3", setHeaderQuery, tourController.getAllTours);

//! Get tour by id
router.get("/:id", tourController.getTourById);

//! add tour
router.post("/", tourController.createTour);

module.exports = router;
