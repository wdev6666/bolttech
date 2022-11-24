const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: false,
    },
    isFinished: { type: Boolean, default: false },
    name: { type: String },
    startDate: { type: String },
    endDate: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
  },
  { timestamps: false }
);

const Project = mongoose.model("projects", ProjectSchema);

module.exports = Project;
