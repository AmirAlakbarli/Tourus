const mongoose = require("mongoose");
const slugify = require("slugify");

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

    slug: String,
    status: {
      type: Number,
      enum: [0, 1],
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
  { timestamps: true, toJSON: { virtuals: true } }
);

//! Virtual fields: Create
// tourSchema.virtual("weeks").get(function () {
//   return this.duration / 7;
// });

//! Docuement based middleware => Before create / after create
//! Before
tourSchema.pre("save", function (next) {
  // document
  this.slug = slugify(this.name, "-");
  next();
});

//! After
// tourSchema.pre("save", function (next) {
//   this.slug = slugify(this.name, "-");
//   next();
// });

//! Query based middleware
tourSchema.pre(/^find/, function (next) {
  this.find({ status: { $ne: 0 } });
  next();
});

//! Aggregation middleware
tourSchema.pre("aggregate", function (next) {
  console.log("o");
  const pipelines = this.pipeline();
  pipelines.unshift({ $match: { status: { $ne: 0 } } });
  next();
});

const Tour = mongoose.model("tour", tourSchema);
module.exports = Tour;
