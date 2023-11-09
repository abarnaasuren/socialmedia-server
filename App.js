const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require('dotenv'); // Import dotenv

// Load environment variables from .env file
dotenv.config();

app.use(cors());

require("./models/model.js");
require('./models/post');
app.use(express.json());

// Define the PORT using process.env.PORT or fallback to 5000
const PORT = process.env.PORT || 5000;

// Serving frontend
app.use(express.static(path.join(__dirname, "./frontend/build")));
app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "./frontend/build/index.html"),
    function (err) {
      res.status(500).send(err);
    }
  );
});

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});

// Use process.env.mongoURL to connect to MongoDB
mongoose.connect(process.env.mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on("connected", () => {
  console.log("Successfully connected to MongoDB");
});

db.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});
