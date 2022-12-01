const router = require('express').Router()
const authRoutes = require('./auth.routes')
const planRoutes = require('./plan.routes')
const exerciseRoutes = require('./exercise.routes')

/* GET home page */
router.get('/', async (req, res, next) => {
  res.json('All good in here')
})

router.use('/auth', authRoutes)
router.use('/plans', planRoutes)
router.use('/exercises', exerciseRoutes)

module.exports = router
