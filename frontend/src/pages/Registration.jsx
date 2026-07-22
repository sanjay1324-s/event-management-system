import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import API from '../api'

function Registration() {
  const location = useLocation()
  const navigate = useNavigate()
  const event = location.state
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await API.post('/events/register', {
        eventId: event.id,
        eventTitle: event.title,
        eventDate: event.date,
        eventLocation: event.location,
        name,
        email,
      })
      setSubmitted(true)
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (!event) {
    return (
      <div className="auth-page">
        <p>No event selected.</p>
        <button onClick={() => navigate('/dashboard')}>Back to Events</button>
      </div>
    )
  }

  if (submitted) {
    return (
      <div className="auth-page">
        <div className="auth-form" style={{ padding: '40px', textAlign: 'center' }}>
          <h1>You're registered! 🎉</h1>
          <p style={{ margin: '16px 0' }}>{name}, you're confirmed for <strong>{event.title}</strong>.</p>
          <p>📅 {event.date} &nbsp; 📍 {event.location}</p>
          <button onClick={() => navigate('/dashboard')} style={{ marginTop: '24px' }}>
            Back to Events
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="auth-page">
      <div className="auth-form">
        <img src={event.image} alt={event.title} className="registration-image" />
        <form onSubmit={handleSubmit} style={{ padding: '28px 32px 32px' }}>
          <h1>Register for {event.title}</h1>
          <p>📅 {event.date} &nbsp; 📍 {event.location}</p>
          {error && <p style={{ color: 'red', margin: '8px 0' }}>{error}</p>}
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Registering...' : 'Confirm Registration'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Registration