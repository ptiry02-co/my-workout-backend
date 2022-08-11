const { Schema, model } = require('mongoose')

const Exercise = model(
  'Exercise',
  new Schema({
    gif: String,
    name: String,
    targetMuscle: String,
    sets: Number,
    reps: Number,
  })
)
module.exports = Exercise
