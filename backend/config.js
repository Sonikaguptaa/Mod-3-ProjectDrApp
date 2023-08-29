const mongoose = require("mongoose");
const colors = require("colors");

const mongoConfig = async () => {
  try {
    const result = await mongoose.connect(process.env.MONGO_URL);
    console.log(` Database connected  ${result.connection.host}`.bgBlue.white);
  } catch (err) {
    console.log(`Mongo Server error:  ${Error}`.bgRed.white);
  }
};

module.exports = mongoConfig;
