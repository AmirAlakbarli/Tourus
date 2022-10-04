const { v4: uuidv4 } = require("uuid");
const Tour = require("../model/tour");
//! Get Dev data Tours:

exports.getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();
    res.json({
      success: true,
      quantity: tours.length,
      data: {
        tours,
      },
    });
  } catch (error) {
    res.status(404).json({ succes: false, message: error });
  }
};

exports.getTourById = async (req, res) => {
  const id = req.params.id;
  const oneTour = await Tour.findById(id);
  try {
    if (!oneTour)
      return res.status(404).json({
        success: false,
        message: "Invalid id",
      });

    res.json({
      success: true,
      data: {
        tour: oneTour,
      },
    });
  } catch (error) {
    res.status(404).json({ succes: false, message: error });
  }
};

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      success: true,
      data: {
        newTour,
      },
    });
  } catch (error) {
    res.status(404).json({ succes: false, message: error });
  }
};
