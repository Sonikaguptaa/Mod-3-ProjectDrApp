const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "first name is required"],
    },

    lastName: {
      type: String,
      required: [true, "last name is required"],
    },

    phone: {
      type: String,
      required: [true, "phone no is required"],
    },

    email: {
      type: String,
      required: [true, "email is required"],
    },

    website: {
      type: String,
    },

    address: {
      type: String,
      required: [true, "address is required"],
    },

    specialization: {
      type: String,
      required: [true, " specialization is required"],
    },

    experience: {
      type: String,
      required: [true, " experience is required"],
    },

    isAvailable: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const doctorModel = mongoose.model("users", doctorSchema);
module.exports = doctorModel;
