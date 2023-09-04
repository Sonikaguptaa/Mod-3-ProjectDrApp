const dotenv = require("dotenv").config();
const express = require("express");

const cors = require("cors");
const app = express();

const PORT = 8080;

// Load the connectDB function
const connectDB = require("./config");

const colors = require("colors");
// Connect to database
connectDB();

app.use(express.json());
app.use(cors());

// routes
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/doctor", require("./routes/doctorRoute"));

app.listen(PORT, () => {
  console.log(
    `App listening at http://localhost:${PORT} ${process.env.MONGO_URL}`
  );
});
