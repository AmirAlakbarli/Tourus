const mongoose = require("mongoose");
const slugify = require("slugify");
const validator = require("validator");

const tourSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Tour name must be defined!"],
      unique: false,
      trim: true,
      minLength: [3, "Tour name must be at least 3 characters"],
      maxLength: [25, "Tour name must be at most 25 characters"],
      // validate: [validator.isAlpha, "Only letters are allowed"],
    },

    price: {
      type: Number,
      required: [true, "Tour price must be defined!"],
    },

    discount: {
      type: Number,
      validate: {
        validator: function (doc) {
          return this.price > doc;
        },
        message: `Discount of {VALUE} must not be greater than price`,
      },
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
      enum: {
        values: ["easy", "medium", "difficult"],
        message: "Difficulty can be only one of these: easy, medium, hard",
      },
    },

    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, "Tour rating must be at least 1"],
      max: [5, "Tour rating must be at most 5"],
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

    // status: {
    //   type: Number,
    //   enum: [0, 1],
    // },

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

    startLocation: {
      description: String,
      type: {
        type: String,
        default: "Point",
        enum: ["Point"],
      },
      coordinates: [Number],
      address: String,
    },

    locations: [
      {
        description: String,
        type: {
          type: String,
          enum: ["Point"],
          default: "Point",
        },
        coordinates: [],
        address: String,
        day: Number,
      },
    ],

    guides: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref:"user"
      },
    ],
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
  this.find({ status: { $ne: 0 } }).populate("guides");
  next();
});

//! Aggregation middleware
// tourSchema.pre("aggregate", function (next) {
//   const pipelines = this.pipeline();
//   pipelines.unshift({ $match: { status: { $ne: 0 } } });
//   next();
// });

const Tour = mongoose.model("tour", tourSchema);
module.exports = Tour;
