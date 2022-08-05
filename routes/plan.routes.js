const router = require('express').Router()

const { isAuthenticated } = require('../middleware/jwt.middleware')
const Plan = require('../models/Plan.model')

router.get('/', isAuthenticated, async (req, res, next) => {
  const { id } = req.payload

  try {
    const userPlans = await Plan.find({ user: id })
    const planTypes = await Plan.schema.path('type').caster.enumValues
    const days = await Plan.schema.path('day').caster.enumValues

    res.json({ userPlans, planTypes, days })
  } catch (error) {
    console.log('Error fetching the plans: ', error)
  }
})

router.post('/new', isAuthenticated, async (req, res, next) => {
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
