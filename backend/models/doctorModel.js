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
    userId: {
      type: String,
      required: true,
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

    status: {
      type: String,
      // default: "pending",
    },

    timings: {
      type: Object,
      required: true,
    },
  },
  { timestamps: true }
);

const doctorModel = mongoose.model("doctors", doctorSchema);
module.exports = doctorModel;
