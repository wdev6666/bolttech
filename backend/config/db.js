const mongoose = require("mongoose");
require("dotenv").config({path: "backend/.env"});

async function db() {
  const connection = await mongoose.connect(process.env.MONGO_URI);
  console.log("DB Connected");
  return connection;
}

module.exports = {
  db,
};
