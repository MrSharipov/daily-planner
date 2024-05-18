const mongoose = require("mongoose");

const planSchema = new mongoose.Schema(
  {
    title: {
      type: "string",
      required: true,
    },
    deadline: {
      type: "string",
      required: true,
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
