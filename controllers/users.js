const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const upload = require('../middleware/image-upload.js')

const { sendError, Unauthorized } = require('../utils/errors')

// Model
const User = require('../models/user')

const SALT_LENGTH = 12

// * Sign Up
router.post('/signup', upload.single('photo'), async (req, res) => {
  try {
    const { password, confirmPassword, username, email, helper } = req.body

    // Check the passwords match
    if (password !== confirmPassword) {
      throw new Unauthorized('Passwords do not match')
    }
   
    // Photo
    if(!req.file) return res.status(422).json({ photo: 'valid image file was not provided' })
      //custom error message
    req.body.photo = req.file.path
    // Hash password
    req.body.hashedPassword = bcrypt.hashSync(password, SALT_LENGTH)

    // Create a new user
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      hashedPassword: req.body.hashedPassword,
      location: req.body.location,
      photo: req.body.photo,
    })
    
    // Generate a JWT to send to the client
    const payload = {
      username: user.username,
      email: user.email,
      location: user.location,
      photo: user.photo,
      _id: user._id
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '24h'
    })
  
    return res.status(201).json({ user: payload, token })
  } catch (error) {
    sendError(error, res)
  }
})

// * Sign In
router.post('/signin', async (req, res) => {
  try {
    const { username, password } = req.body
    
    // Checking the username exists in the database
    const user = await User.findOne({ username })
    
    // Check user exists
    if (!user) {
      throw new Unauthorized('Attempt failed as user was not found')
    }

    // Compare plain text password against the hash
    if(!bcrypt.compareSync(password, user.hashedPassword)) {
      throw new Unauthorized('Attempt failed as password was not correct')
    }

    // Generate our JWT
    const payload = {
      username: user.username,
      email: user.email,
      helper: user.helper,
      location: user.location,
      photo: user.photo,
      _id: user._id
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '24h'
    })

    return res.json({ user: payload, token })

  } catch (error) {
    sendError(error, res)
  }
})

// * Profile
router.put('/profile/:userId', async (req, res) => {
  try {
    const { userId } = req.params
    const { location, photo } = req.body
    
    // Checking the username exists in the database
    const user = await User.findById(userId)

    user.location = location
    user.photo = photo

    await user.save()
    
    const payload = {
      username: user.username,
      email: user.email,
      helper: user.helper,
      location: user.location,
      photo: user.photo,
      _id: user._id
    }

    if (!profile) {
      throw new NotFound('Profile not found')
  }

    return res.json({ user: payload })

  } catch (error) {
    sendError(error, res)
  }
})


module.exports = router;


// * Sign Up Helper
// router.post('/helper-signup', async (req, res) => {
//   try {
//     const { password, confirmPassword, username, email, helper } = req.body
//     // Check the passwords match
//     if (password !== confirmPassword) {
//       return res.status(401).json({ error: 'Unauthorized' })
//     }

//     // Check if the username is already taken
//     const userInDatabase = await User.findOne({ username: req.body.username });
//     if (userInDatabase) {
//       return res.status(400).json({error:'Username already taken.'});
//     }

//     // Hash password
//     req.body.hashedPassword = bcrypt.hashSync(password, SALT_LENGTH)

//     // Create a new user
//     const user = await User.create({
//       username: req.body.username,
//       email: req.body.email,
//       hashedPassword: req.body.hashedPassword,
//       helper: true,
//     })
    
//     // Generate a JWT to send to the client
//     const payload = {
//       username: user.username,
//       email: user.email,
//       helper: user.helper,
//       location: user.location,
//       _id: user._id
//     }

//     const token = jwt.sign(payload, process.env.JWT_SECRET, {
//       expiresIn: '24h'
//     })
  
//     return res.status(201).json({ user: payload, token })
//   } catch (error) {
//     console.log(error)
//     return res.status(400).json({ error: error.message });
//   }
// })

// // * Sign In
// router.post('/helper-signin', async (req, res) => {
//   try {
//     const { username, password } = req.body
    
//     // Checking the username exists in the database
//     const user = await User.findOne({ username })
    
//     // Check user exists
//     if (!user) {
//       console.log('Attempt failed as username was incorrect')
//       return res.status(401).json({ error: 'Unauthorized' })
//     }

//     // Compare plain text password against the hash
//     if(!bcrypt.compareSync(password, user.hashedPassword)) {
//       console.log('Attempt failed as password was not correct')
//       return res.status(401).json({ error: 'Unauthorized' })
//     }

//     // Generate our JWT
//     const payload = {
//       username: user.username,
//       email: user.email,
//       helper: user.helper,
//       location: user.location,
//       photo: user.photo,
//       _id: user._id
//     }

//     const token = jwt.sign(payload, process.env.JWT_SECRET, {
//       expiresIn: '24h'
//     })

//     return res.json({ user: payload, token })

//   } catch (error) {
//     console.log(error)
//     return res.status(500).json({ error: error.message })
//   }
// })
