const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config({ path: require('path').join(__dirname, '.env') })

const app = express()

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use(express.json())

// Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/events', require('./routes/events'))

// Test route
app.get('/', (req, res) => {
  res.send('Event Management API is running')
})

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected')
    app.listen(process.env.PORT || 5000, '0.0.0.0', () => {
      console.log('Server running on port 5000')
    })
  })
  .catch((err) => console.log('MongoDB connection error:', err))