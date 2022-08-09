const { Schema, model } = require('mongoose')

const Plan = model(
  'Plan',
  new Schema({
    name: String,
    type: {
      type: String,
      enum: ['Upper body', 'Arms', 'Core', 'Back', 'Legs', 'Cardio', 'Mix'],
    },
    description: String,
    day: {
      type: String,
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    },
    exercises: {
      type: [Schema.Types.ObjectId],
      ref: 'Exercise',
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  })
)
module.exports = Plan
