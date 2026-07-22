const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const Registration = require('../models/Registration')

// Middleware to verify login token
const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ message: 'No token, access denied' })
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch {
    res.status(401).json({ message: 'Invalid token' })
  }
}

// GET all events (static list for now)
router.get('/', (req, res) => {
  const events = [
    { id: 1, title: 'City Basketball Championship', date: '2026-07-12', location: 'Bangalore', category: 'Sports', image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&h=400&fit=crop' },
    { id: 2, title: 'National Cricket Tournament', date: '2026-08-20', location: 'Mumbai', category: 'Sports', image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=600&h=400&fit=crop' },
    { id: 3, title: 'Inter-College Football Cup', date: '2026-09-05', location: 'Chennai', category: 'Sports', image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&h=400&fit=crop' },
    { id: 4, title: 'Science Quiz Championship', date: '2026-07-25', location: 'Delhi', category: 'Education', image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&h=400&fit=crop' },
    { id: 5, title: 'National Coding Olympiad', date: '2026-08-15', location: 'Hyderabad', category: 'Education', image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop' },
    { id: 6, title: 'Debate & Public Speaking Contest', date: '2026-09-18', location: 'Pune', category: 'Education', image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&h=400&fit=crop' },
    { id: 7, title: 'Sunburn Music Festival', date: '2026-08-02', location: 'Goa', category: 'Music', image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&h=400&fit=crop' },
    { id: 8, title: 'Indie Rock Night', date: '2026-09-10', location: 'Bangalore', category: 'Music', image: 'https://images.unsplash.com/photo-1493676304819-0d7a8d026dcf?w=600&h=400&fit=crop' },
  ]
  res.json(events)
})

// POST register for an event (requires login)
router.post('/register', auth, async (req, res) => {
  try {
    const { eventId, eventTitle, eventDate, eventLocation, name, email } = req.body
    const registration = await Registration.create({
      userId: req.user.id,
      eventId, eventTitle, eventDate, eventLocation, name, email
    })
    res.json({ message: 'Registration successful', registration })
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
})

// GET my registrations (requires login)
router.get('/my-registrations', auth, async (req, res) => {
  try {
    const registrations = await Registration.find({ userId: req.user.id })
    res.json(registrations)
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
})

module.exports = router