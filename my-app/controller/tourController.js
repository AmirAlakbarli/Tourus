const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
//! Get Dev data Tours:
const tours = JSON.parse(fs.readFileSync(`${__dirname}/../tours-data.json`));

exports.getAllTours = (req, res) => {
  res.json({
    success: true,
    data: {
      tours,
    },
  });
};

exports.getTourById = (req, res) => {
  const id = req.params.id;
  const oneTour = tours.find((tour) => tour.id == id);
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
};

exports.createTour = (req, res) => {
  const id = uuidv4();
  const newTour = { ...req.body, id };
  const resTours = [...tours, newTour];
  fs.writeFileSync(`${__dirname}/../tours-data.json`, JSON.stringify(resTours));
  res.json({ success: true, data: { resTours } });
};
