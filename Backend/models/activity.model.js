const mongoose = require("mongoose");

module.exports = mongoose.model("PhysicalActivity", {
  Date: { type: String },

  Name: { type: String, required: true },

  Time: {
    type: Number,
    min: 0,
    required: true,
  },

  ActivityCost: {
    type: Number,
    min: 0,
    required: true,
  },

  Transport: { type: String, required: true },

  Calories: {
    type: Number,
    min: 0,
    required: true,
  },

  CalorieCost: {
    type: Number,
    min: 0,
    required: true,
  },

  IsPlaned: { type: Boolean },

  User: {
    type: String,
    required: true,
  },
});
