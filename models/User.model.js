const { Schema, model } = require('mongoose')

const User = model(
  'User',
  new Schema(
    {
      username: {
        type: String,
        required: [true, 'Please provide a name or username.'],
        trim: true,
        lowerCase: true,
      },
      password: {
        type: String,
        required: [true, 'You need to enter a password.'],
        trim: true,
        match: /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,}/,
      },
    },
    {
      // this second object adds extra properties: `createdAt` and `updatedAt`
      timestamps: true,
    }
  )
)

module.exports = User
