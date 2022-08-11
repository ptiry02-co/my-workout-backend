const router = require('express').Router()

const { isAuthenticated } = require('../middleware/jwt.middleware')
const Plan = require('../models/Plan.model')
const Exercise = require('../models/Exercise.model')

router.get('/', isAuthenticated, async (req, res, next) => {
  const { id } = req.payload

  try {
    const { exercises } = await Plan.find({ user: id }).populate('exercises')

    res.json(exercises)
  } catch (error) {
    console.log('Error fetching the plans: ', error)
  }
})

router.post('/new', isAuthenticated, async (req, res, next) => {
  const exerciseData = req.body

  try {
    const newExercise = await Exercise.create(exerciseData.exercise)
    await Plan.findByIdAndUpdate(exerciseData.planId, { $push: { exercises: newExercise._id } })

    res.json(newExercise)
  } catch (error) {
    console.log('Error creating new plan: ', error)
  }
})
module.exports = router
