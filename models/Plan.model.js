const { Schema, model } = require('mongoose')

const Plan = model(
  'Plan',
  new Schema({
    name: String,
    type: {
      type: String,
      enum: ['upperBody', 'arms', 'core', 'back', 'legs', 'cardio', 'mix'],
    },
    description: String,
    day: {
      type: String,
      enum: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
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
