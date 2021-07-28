const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')

// Create user Schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      validate: function (value) {
        if (!validator.isEmail(value)) {
          throw new Error('Email is invalid')
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minLength: 7,
      validate(value) {
        if (value.toLowerCase().includes('password')) {
          throw new Error('Password cannot contain "password"')
        }
      },
    },
    age: {
      type: Number,
      default: 0,
      validate(value) {
        if (value < 0) {
          throw new Error('Age must be a positive value')
        }
      },
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    avatar: {
      type: Buffer,
    },
  },
  {
    timestamps: true,
  }
)

userSchema.virtual('tasks', {
  ref: 'Task',
  localField: '_id',
  foreignField: 'owner',
})

// customize instance before JSON.stringify() and sending it
// because res.send use JSON.stringify behind the sense
userSchema.methods.toJSON = function () {
  const user = this
  const userObject = user.toObject() // Mongoose API - convert user to plain object to hiding privates properties

  // Hide password and tokens properties
  delete userObject.password
  delete userObject.tokens
  delete userObject.avatar

  return userObject
}

// Mongoose - instance method to generate JWT and save to DB
userSchema.methods.generateAuthToken = async function () {
  const user = this
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET)
  user.tokens = user.tokens.concat({ token })
  await user.save()
  return token
}

// Mongoose - model method for login
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email })

  if (!user) {
    throw new Error('Unable to login')
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) {
    throw new Error('Unable to login')
  }

  return user
}

// Mongoose Middleware - to hash plain text password before saving to DB
userSchema.pre('save', async function (next) {
  const user = this // access to the individual user/document that's about to be saved

  if (user.isModified('password')) {
    // isModified -> mongoose method return true if field created or updated
    user.password = await bcrypt.hash(user.password, 8)
  }

  next() // to save user after run middleware
})

// Delete user tasks when user is removed
userSchema.pre('remove', async function (next) {
  const user = this
  await Task.deleteMany({ owner: user._id })

  next()
})

// Create User model
const User = mongoose.model('User', userSchema)

module.exports = User
