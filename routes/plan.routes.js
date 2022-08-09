const router = require('express').Router()

const { isAuthenticated } = require('../middleware/jwt.middleware')
const Plan = require('../models/Plan.model')

router.get('/', isAuthenticated, async (req, res, next) => {
  const { id } = req.payload

  try {
    const userPlans = await Plan.find({ user: id }).populate('exercises')
    const planTypes = Plan.schema.path('type').enumValues
    const days = Plan.schema.path('day').enumValues

    res.json({ userPlans, enums: { planTypes, days } })
  } catch (error) {
    console.log('Error fetching the plans: ', error)
  }
})

router.post('/', isAuthenticated, async (req, res, next) => {
  const { id } = req.payload
  const planData = req.body

  try {
    const newPlan = await Plan.create({ ...planData, user: id })

    res.json(newPlan)
  } catch (error) {
    console.log('Error creating new plan: ', error)
  }
})

router.get('/:planId', isAuthenticated, async (req, res, next) => {
  const { planId } = req.params

  try {
    const plan = await Plan.findById(planId).populate('exercises')

    res.json(plan)
  } catch (error) {
    console.log('Error fetching plan: ', error)
  }
})

router.put('/:planId', isAuthenticated, async (req, res, next) => {
  const newInfo = req.body
  const { planId } = req.params

  try {
    const editedPlan = await Plan.findByIdAndUpdate(planId, newInfo, { new: true })

    res.json(editedPlan)
  } catch (error) {
    console.log('Error creating new plan: ', error)
  }
})

router.delete('/:planId', isAuthenticated, async (req, res, next) => {
  const { planId } = req.params

  try {
    await Plan.findByIdAndDelete(planId)

    res.json({ message: 'Delete Successfull' })
  } catch (error) {
    console.log('Error deleting plan: ', error)
  }
})
module.exports = router
