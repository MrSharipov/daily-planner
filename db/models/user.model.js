const Mongoose = require("mongoose");

const userSchema = new Mongoose.Schema(
  {
    active: {
      type: Boolean,
      required: true,
    },
    user_name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
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
  { versionKey: false }
);

module.exports = Mongoose.model("User", userSchema);
