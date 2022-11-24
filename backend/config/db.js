const mongoose = require("mongoose");
require("dotenv").config();

async function db() {
  const connection = await mongoose.connect(process.env.MONGO_URI);
  console.log("DB Connected");
  return connection;
}

module.exports = {
  db,
};
