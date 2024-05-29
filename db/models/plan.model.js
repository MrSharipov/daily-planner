const mongoose = require("mongoose");

const planSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    deadline: {
      type: Number,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      required: true,
    },
    userId:{
      type: mongoose.Types.ObjectId,
      required: true
    },
    created_at: {
      type: Number,
      required: true,
    },
    updated_at: {
      type: Number,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("Plan", planSchema);
