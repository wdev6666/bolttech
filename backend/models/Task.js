const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: false,
    },
    description: { type: String },
    notes: { type: String },
    projectId: { type: String },
    startDate: { type: String },
    endDate: { type: String },
    isFinished: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
  },
  { timestamps: false }
);

const Task = mongoose.model("tasks", TaskSchema);

module.exports = Task;
