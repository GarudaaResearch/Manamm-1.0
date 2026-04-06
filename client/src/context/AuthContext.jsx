import { createContext, useContext, useState, useEffect } from 'react'
import api from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('emanam_user')) } catch { return null }
  })
  const [loading, setLoading] = useState(false)

  const login = async (email, password) => {
    setLoading(true)
    try {
      const { data } = await api.post('/auth/login', { email, password })
      localStorage.setItem('emanam_token', data.token)
      localStorage.setItem('emanam_user', JSON.stringify(data.user))
      setUser(data.user)
      return { success: true, user: data.user }
    } catch (err) {
      return { success: false, error: err.response?.data?.error || 'Login failed' }
    } finally { setLoading(false) }
  }

  const logout = () => {
    localStorage.removeItem('emanam_token')
    localStorage.removeItem('emanam_user')
    setUser(null)
  }

  // Mock login for demo (no backend required)
  const mockLogin = (email, password) => {
    const DEMO_USERS = {
      'admin@emanam.edu':        { id: '1', email: 'admin@emanam.edu',   role: 'SUPER_ADMIN', organization: { name: 'E-Manam Platform', logoUrl: null }, password: 'Admin@Emanam' },
      'faculty@emanam.edu':      { id: '2', email: 'faculty@emanam.edu', role: 'FACULTY',     organization: { name: 'RCAS College' }, password: 'Emanam@123' },
      'student001@emanam.edu':   { id: '3', email: 'student001@emanam.edu', role: 'STUDENT',  organization: { name: 'RCAS College' }, password: 'Emanam@123' },
    }
    const u = DEMO_USERS[email]
    if (u && u.password === password) {
      const { password: _, ...safeUser } = u
      localStorage.setItem('emanam_token', 'demo_token_' + u.id)
      localStorage.setItem('emanam_user',  JSON.stringify(safeUser))
      setUser(safeUser)
      return { success: true, user: safeUser }
    }
    // Allow any student001..100
    if (/^student\d{3}@emanam\.edu$/.test(email) && password === 'Emanam@123') {
      const safeUser = { id: email, email, role: 'STUDENT', organization: { name: 'RCAS College' } }
      localStorage.setItem('emanam_token', 'demo_token_student')
      localStorage.setItem('emanam_user',  JSON.stringify(safeUser))
      setUser(safeUser)
      return { success: true, user: safeUser }
    }
    return { success: false, error: 'Invalid credentials' }
  }

  return (
    <AuthContext.Provider value={{ user, loading, login: mockLogin, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
