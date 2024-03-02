const express = require("express");
const app = express();
const dotenv= require("dotenv");
dotenv.config();
const PORT = process.env.PORT||4000;
const cors = require("cors");
const mongoose = require("mongoose");
const UserRoutes = require("./routes/UserRoutes");
const TaskRoutes = require("./routes/TaskRoutes");

// mongooose connection
mongoose.connect("mongodb://127.0.0.1:27017/tasks");
mongoose.connection.on("connected", () => {
  console.log("DB connected");
});
mongoose.connection.on("error", (error) => {
  console.error("Error connecting to DB:", error);
});

app.use(cors());
app.use(express.json());
app.use(UserRoutes);
app.use(TaskRoutes);


// server start
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
  