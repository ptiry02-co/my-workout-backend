const router = require('express').Router()

// ℹ️ Handles password encryption
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

// How many rounds should bcrypt run the salt (default [10 - 12 rounds])
const saltRounds = 10

// Require the User model in order to interact with the database
const User = require('../models/User.model')

// Require the jwt library
const jwt = require('jsonwebtoken')
const { isAuthenticated } = require('../middleware/jwt.middleware')

router.post('/signup', async (req, res) => {
  const { email, password } = req.body

  if (password.length < 6) {
    return res.status(400).json({
      errorMessage: 'Your password needs to be at least 6 characters long.',
    })
  }
  try {
    // Search the database for a user with the email submitted in the form
    const found = await User.findOne({ email })
    // If the user is found, send the message email is taken
    if (found) {
      return res.status(400).json({ errorMessage: 'User allready exists.' })
    }

    // if user is not found, create a new user - start with hashing the password
    const salt = await bcrypt.genSalt(saltRounds)
    const hashedPassword = await bcrypt.hash(password, salt)
    // Create a user and save it in the database
    await User.create({
      email,
      password: hashedPassword,
    })

    res.redirect(308, '/api/auth/login')
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({ errorMessage: error.message })
    }
    if (error.code === 11000) {
      return res.status(400).json({
        errorMessage: 'Username need to be unique. The username you chose is already in use.',
        error,
      })
    }
    return res.status(500).json({ errorMessage: error.message })
  }
})

router.post('/login', async (req, res, next) => {
  const { email, password } = req.body

  // Here we use the same logic as above
  // - either length based parameters or we check the strength of a password
  if (password.length < 6) {
    return res.status(400).json({
      errorMessage: 'Your password needs to be at least 6 characters long.',
    })
  }
  try {
    // Search the database for a user with the username submitted in the form
    const checkUser = await User.findOne({ email })
    // If the user isn't found, send the message that user provided wrong credentials
    if (!checkUser) {
      return res.status(400).json({ errorMessage: 'Incorrect username and/or password' })
    }

    // If user is found based on the username, check if the in putted password matches the one saved in the database
    const isSamePassword = await bcrypt.compare(password, checkUser.password)

    if (!isSamePassword) {
      return res.status(400).json({ errorMessage: 'Incorrect username and/or password' })
    }
    // Create an object that will be set as the token payload
    const payload = { id: checkUser._id, email: checkUser.email }

    // Create and sign the token
    const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, { algorithm: 'HS256', expiresIn: '6h' })

    const user = await User.findById(checkUser._id, { password: 0 })

    // Send the token as the response
    res.status(200).json({ user, authToken })
  } catch (err) {
    // in this case we are sending the error handling to the error handling middleware that is defined in the error handling file
    // you can just as easily run the res.status that is commented out below
    next(err)
    // return res.status(500).render("login", { errorMessage: err.message });
  }
})

router.get('/verify', isAuthenticated, async (req, res, next) => {
  const { id } = req.payload

  try {
    const user = await User.findById(id, { password: 0 })
    res.status(200).json(user)
  } catch (error) {
    next(err)
  }
})

module.exports = router
