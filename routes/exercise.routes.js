const router = require('express').Router()

const { isAuthenticated } = require('../middleware/jwt.middleware')
const Plan = require('../models/Plan.model')
const Exercise = require('../models/Exercise.model')

router.get('/', isAuthenticated, async (req, res, next) => {
  const { id } = req.payload

  try {
    const plans = await Plan.find({ user: id }).populate('exercises')
    const exercises = plans.map(p => {
      if (!p.exercises[0]) return { plan: p.name, exercises: 'empty' }
      return { plan: p.name, exercises: p.exercises }
    })

    res.json(exercises)
  } catch (error) {
    console.log('Error fetching the plans: ', error)
  }
})

router.post('/', isAuthenticated, async (req, res, next) => {
  const exerciseData = req.body

  try {
    const newExercise = await Exercise.create(exerciseData.exercise)
    await Plan.findByIdAndUpdate(exerciseData.planId, { $push: { exercises: newExercise._id } })

    res.json(newExercise)
  } catch (error) {
    console.log('Error creating new plan: ', error)
  }
})

router.delete('/:exerciseId', isAuthenticated, async (req, res, next) => {
  const { exerciseId } = req.params

  try {
    await Exercise.findByIdAndDelete(exerciseId)

    Plan.findOne({ exercises: { _id: exerciseId } })
      .then(res => {
        const newList = res.exercises.filter(id => id != exerciseId)

        return { newList, res }
      })
      .then(list => {
        Plan.findByIdAndUpdate(list.res._id, { exercises: list.newList }, { new: true }).then(updatedPlan => {
          res.json({ message: 'delete successfull' })
        })
      })
      .catch(error => {
        throw error
      })
  } catch (error) {
    console.log('Error deleting exercise: ', error)
  }
})
module.exports = router
