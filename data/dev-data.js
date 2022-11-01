const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config({ path: "../config.env" });
const fs = require("fs");
const Tour = require("../src/models/tour");

//! Initializing the App
const app = express();

//! define PORT number
const PORT = process.env.PORT || 5000;

//! MongoDB Connection
const DB = process.env.DB_URL.replace("<password>", process.env.DB_PASSWORD);
mongoose.connect(DB, (err) => {
  if (err) return console.log("Error occured");
  const tours = JSON.parse(fs.readFileSync(`${__dirname}/../tours-data.json`));

  async function importData() {
    try {
      await Tour.create(tours);
      console.log("Data was imported");
    } catch (error) {
      console.log(error);
    }

    process.exit();
  }

  async function deleteData() {
    try {
      await Tour.deleteMany();
      console.log("Data was deleted");
    } catch (error) {
      console.log(error);
    }

    process.exit();
  }

  switch (process.argv[2]) {
    case "import":
      importData();
      break;

    case "delete":
      deleteData();
      break;

    default:
      break;
  }
});
