import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../api'

function Dashboard() {
  const navigate = useNavigate()
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const user = JSON.parse(localStorage.getItem('user') || '{}')

  useEffect(() => {
    API.get('/events')
      .then(res => setEvents(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <div className="App">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px', marginBottom: '20px' }}>
        <h1>Upcoming Events</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ color: '#666' }}>Hi, {user.name || 'User'}</span>
          <button onClick={handleLogout} style={{ padding: '8px 16px', background: '#764ba2', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
            Logout
          </button>
        </div>
      </div>
      {loading ? (
        <p>Loading events...</p>
      ) : (
        <div className="event-list">
          {events.map((event) => (
            <div key={event.id} className="event-card">
              <img src={event.image} alt={event.title} className="event-image" />
              <span className="event-category">{event.category}</span>
              <h2>{event.title}</h2>
              <p>📅 {event.date}</p>
              <p>📍 {event.location}</p>
              <button onClick={() => navigate(`/register/${event.id}`, { state: event })}>
                Register
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Dashboard