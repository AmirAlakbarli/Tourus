const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please insert a title for review"],
    },

    content: {
      type: String,
      required: [true, "Please insert a content for review"],
    },

    rating: {
      type: Number,
      min: 1,
      max: 5,
    },

    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },

    tour: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "tour",
    },
  },

  { timestamps: true }
);

reviewSchema.pre(/^find/, function (next) {
  this.populate({ path: "creator", select: "-role" });
  next();
});

const Review = mongoose.model("review", reviewSchema);
module.exports = Review;
