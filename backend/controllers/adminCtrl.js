const userModel = require("../models/userModel");

const doctorModel = require("../models/doctorModel");

const getAllUserController = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).send({
      success: true,
      message: "users data List",
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Fetching userData",
      error,
    });
  }
};
const getAllDoctorController = async (req, res) => {
  try {
    const doctors = await doctorModel.find({});
    res.status(200).send({
      success: true,
      message: "doctor data List",
      data: doctors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Fetching doctorsData",
      error,
    });
  }
};

//doctor A/c status

const changeAccountStatusController = async (req, res) => {
  try {
    const { doctorId, status, userId } = req.body;
    const doctor = await doctorModel.findByIdAndUpdate(
      doctorId,
      { status }
      // { returnOriginal: false }
    );
    console.log(doctorId, doctor, userId);
    const user = await userModel.findOne({ _id: userId });
    console.log(user);

    // if (!doctor) {
    //   return res.status(404).send({
    //     success: false,
    //     message: "Doctor not found",
    //   });
    // }

    // const user = await userModel.findById(doctor.userId);

    // if (!user) {
    //   return res.status(404).send({
    //     success: false,
    //     message: "User not found",
    //   });
    // }

    const notification = user.notification;
    notification.push({
      type: "doctor-account-request-updated",
      message: ` Your Doctor Account Request has ${status}`,
      onClickPath: "/notification",
    });

    user.isDoctor = status === "approved" ? true : false;
    await user.save();
    res.status(201).send({
      success: true,
      message: "Account Status updated",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in changing account status",
      error,
    });
  }
};

module.exports = {
  getAllDoctorController,
  getAllUserController,
  changeAccountStatusController,
};
