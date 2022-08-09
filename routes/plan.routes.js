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
module.exports = router
