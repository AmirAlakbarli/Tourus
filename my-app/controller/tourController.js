const Tour = require("../model/tour");
const GlobalFilter = require("../utils/GlobalFilter");
//! Get Dev data Tours:

exports.getAllTours = async (req, res) => {
  try {
    let allTours = new GlobalFilter(Tour.find(), req.query);

    //! Filter, Sorting, Fields, Pagination
    allTours.filter().fields().sort().paginate();
    const tours = await allTours.query;
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

exports.getStatistics = async (req, res) => {
  try {
    const statistics = await Tour.aggregate([
      {
        $group: {
          _id: { $toUpper: "$difficulty" },
          avgRating: { $avg: "$ratingsAverage" },
          minPrice: { $min: "$price" },
          maxPrice: { $max: "$price" },
          ratingTotal: { $sum: "$ratingsAverage" },
          totalRatingCount: { $sum: 1 },
        },
      },
      {
        $sort: {
          avgRating: 1,
        },
      },
      {
        $match: {
          maxPrice: { $lte: 1997 },
        },
      },
    ]);

    res.status(200).json({ succes: true, data: { statistics } });
  } catch (error) {
    res.status(404).json({ succes: false, message: error });
  }
};

exports.getTourStats = async (req, res) => {
  try {
    const year = req.params.year;
    const data = await Tour.aggregate([
      {
        $unwind: "$startDates",
      },
      {
        $match: {
          startDates: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: { $month: new Date("$startDates") },
          count: { $sum: 1 },
          tours: { $push: "$name" },
        },
      },
      {
        $addFields: { month: "$_id" },
      },
      {
        $project: { _id: 0 },
      },
    ]);
    res.status(200).json({ succes: true, data });
  } catch (error) {
    res.status(404).json({ succes: false, message: error });
  }
};
