import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../api'

function Login() {
  const [isSignup, setIsSignup] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const endpoint = isSignup ? '/auth/signup' : '/auth/login'
      const payload = isSignup ? { name, email, password } : { email, password }
      const res = await API.post(endpoint, payload)
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>{isSignup ? 'Create Account' : 'Welcome Back'}</h1>
        <p className="login-subtitle">
          {isSignup ? 'Sign up to register for events' : 'Login to manage your event registrations'}
        </p>
        {error && <p style={{ color: 'red', marginBottom: '12px' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          {isSignup && (
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Please wait...' : isSignup ? 'Sign Up' : 'Login'}
          </button>
        </form>
        <p style={{ marginTop: '16px', fontSize: '14px', color: '#666' }}>
          {isSignup ? 'Already have an account?' : "Don't have an account?"}
          <span
            onClick={() => { setIsSignup(!isSignup); setError('') }}
            style={{ color: '#764ba2', cursor: 'pointer', marginLeft: '6px', fontWeight: '600' }}
          >
            {isSignup ? 'Login' : 'Sign Up'}
          </span>
        </p>
      </div>
    </div>
  )
}

export default Login