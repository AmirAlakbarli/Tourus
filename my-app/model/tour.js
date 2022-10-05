const mongoose = require("mongoose");

const tourSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Tour name must be defined!"],
      unique: false,
    },

    price: {
      type: Number,
      required: [true, "Tour price must be defined!"],
    },

    duration: {
      type: Number,
      required: [true, "Tour duration must be defined!"],
    },

    maxGroupSize: {
      type: Number,
      required: [true, "Tour group size must be defined!"],
    },

    difficulty: {
      type: String,
      required: [true, "Tour difficulty must be defined!"],
      enum: ["easy", "medium", "difficult"],
    },

    ratingsAverage: {
      type: Number,
      default: 4.5,
    },

    ratingsQuantity: {
      type: Number,
      default: 0,
    },

    summary: {
      type: String,
      required: [true, "Summary must be defined!"],
    },

    description: {
      type: String,
    },

    imageCover: {
      type: String,
      required: [true, "Tour cover image must be defined!"],
    },

    images: {
      type: [String],
    },

    startDates: {
      type: [Date],
      required: [true, "Tour dates must be defined!"],
    },
  },
  { timestamps: true }
);

const Tour = mongoose.model("tour", tourSchema);
module.exports = Tour;
