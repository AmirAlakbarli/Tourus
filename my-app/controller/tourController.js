const Tour = require("../model/tour");
const GlobalFilter = require("../utils/GlobalFilter");
const asyncCatch = require("../utils/asyncCatch");
//! Get Dev data Tours:

exports.getAllTours = asyncCatch(async (req, res) => {
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
});

exports.getTourById = asyncCatch(async (req, res) => {
  const id = req.params.id;
  const oneTour = await Tour.findById(id);
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
});

exports.createTour = asyncCatch(async (req, res) => {
  const newTour = await Tour.create(req.body);
  res.status(201).json({
    success: true,
    data: {
      newTour,
    },
  });
});

exports.updateTour = asyncCatch(async (req, res) => {
  const id = req.params.id;
  const updatedTour = await Tour.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!updatedTour)
    return res.status(404).json({
      success: false,
      message: "Invalid id",
    });

  res.status(200).json({
    success: true,
    data: {
      updatedTour,
    },
  });
});

exports.deleteTour = asyncCatch(async (req, res) => {
  const id = req.params.id;
  const deletedTour = await Tour.findByIdAndRemove(id);
  if (!deletedTour)
    return res.status(404).json({
      success: false,
      message: "Invalid id",
    });

  res
    .status(200)
    .json({ success: true, message: "Tour deleted", data: deletedTour });
});

exports.getStatistics = asyncCatch(async (req, res) => {
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
});

exports.getTourStats = asyncCatch(async (req, res) => {
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
});
