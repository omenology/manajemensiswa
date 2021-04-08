const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    address: {
      type: {
        street: String,
        zipcode: Number,
      },
      required: true,
    },
    role: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
      default: 1,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true, strict: false }
);

module.exports = model("user", userSchema);
