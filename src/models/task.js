const mongoose = require('mongoose')

// Task schema
const taskSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', // Define the owner as a reference to the User model
    },
  },
  {
    timestamps: true,
  }
)

// Create Task model
const Task = mongoose.model('Task', taskSchema)

module.exports = Task
