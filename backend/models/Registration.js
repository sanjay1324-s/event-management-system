const mongoose = require('mongoose')

const registrationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  eventId: { type: Number, required: true },
  eventTitle: { type: String, required: true },
  eventDate: { type: String, required: true },
  eventLocation: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
}, { timestamps: true })

module.exports = mongoose.model('Registration', registrationSchema)