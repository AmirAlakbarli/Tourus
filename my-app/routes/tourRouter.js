const express = require("express");
const router = express.Router();

const tourController = require("../controller/tourController");

//! Routes:

//! Get all tours
router.get("/", tourController.getAllTours);

//! Get tour by id
router.get("/:id", tourController.getTourById);

//! add tour
router.post("/", tourController.createTour);

module.exports = router;
