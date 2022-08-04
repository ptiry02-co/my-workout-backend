const { Schema, model } = require('mongoose')

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: [true, 'Please enter your username.'],
    },
    email: {
      type: String,
      required: [true, 'Please provide an email.'],
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address.'],
      trim: true,
      unique: [true, 'Email is already in use.'],
      lowerCase: true,
    },
    password: {
      type: String,
      required: [true, 'You need to enter a password.'],
      trim: true,
      match: [/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,}/, 'The password needs at least one number and a capital letter.'],
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
)

const User = model('User', userSchema)

module.exports = User
