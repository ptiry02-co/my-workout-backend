const { Schema, model } = require('mongoose')

const Exercise = model(
  'Exercise',
  new Schema({
    gif: String,
    name: String,
    bodypart: String,
    sets: Number,
    reps: Number,
  })
)
module.exports = Exercise
