const router = require('express').Router()
const authRoutes = require('./auth.routes')
const planRoutes = require('./plan.routes')
const exerciseRoutes = require('./exercise.routes')

/* GET home page */
router.get('/', async (req, res, next) => {
  res.json('All good in here')
})

router.get('http://13.39.13.247/.well-known/pki-validation/9F94B70D0B9965576B49A310172D996D.txt', (req, res) => {
  res.sendFile('/home/ubuntu/my-workout-backend/config/9F94B70D0B9965576B49A310172D996D.txt')
})

router.use('/api/auth', authRoutes)
router.use('/api/plans', planRoutes)
router.use('/api/exercises', exerciseRoutes)

module.exports = router
