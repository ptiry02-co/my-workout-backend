const { Schema, model } = require('mongoose')

const Exercise = model(
  'Exercise',
  new Schema({
    gif: String,
    name: String,
    bodypart: {
      type: String,
      enum: ['upperBody', 'arms', 'core', 'back', 'legs', 'cardio'],
    },
    sets: Number,
    reps: Number,
    plan: {
      type: Schema.Types.ObjectId,
      ref: 'Plan',
    },
  })
)
module.exports = Exercise
