import { BrowserRouter as Router, Routes, Route, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import PublicHomePage from './pages/PublicHomePage'
import PublicMatchesPage from './pages/PublicMatchesPage'
import PublicTeamsPage from './pages/PublicTeamsPage'
import AdminMatchesPage from './pages/AdminMatchesPage'
import AdminTeamsPage from './pages/AdminTeamsPage'
import './App.css'

function AppContent() {
  const { isAuthenticated, isAdmin, logout, user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  // Don't show nav on auth pages
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register'

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="App">
      {!isAuthPage && (
        <nav className="site-nav">
          {isAuthenticated ? (
            isAdmin ? (
              <>
                <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
                  Hjem
                </NavLink>
                <NavLink to="/admin" end className={({ isActive }) => (isActive ? 'active' : '')}>
                  Kamper
                </NavLink>
                <NavLink to="/admin/teams" className={({ isActive }) => (isActive ? 'active' : '')}>
                  Lag
                </NavLink>
                <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span style={{ color: 'var(--neutral)', fontSize: '0.95rem' }}>
                    Velkommen, {user?.username || 'Admin'}
                  </span>
                  <button onClick={handleLogout} className="button button-secondary button-sm">
                    Logg ut
                  </button>
                </div>
              </>
            ) : (
              <>
                <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
                  Hjem
                </NavLink>
                <NavLink to="/kamper" className={({ isActive }) => (isActive ? 'active' : '')}>
                  Kamper
                </NavLink>
                <NavLink to="/lag" className={({ isActive }) => (isActive ? 'active' : '')}>
                  Lag
                </NavLink>
                <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span style={{ color: 'var(--neutral)', fontSize: '0.95rem' }}>
                    Velkommen, {user?.username}
                  </span>
                  <button onClick={handleLogout} className="button button-secondary button-sm">
                    Logg ut
                  </button>
                </div>
              </>
            )
          ) : (
            <>
              <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
                Hjem
              </NavLink>
              <NavLink to="/kamper" className={({ isActive }) => (isActive ? 'active' : '')}>
                Kamper
              </NavLink>
              <NavLink to="/lag" className={({ isActive }) => (isActive ? 'active' : '')}>
                Lag
              </NavLink>
              <div style={{ marginLeft: 'auto' }}>
                <NavLink to="/login" className="button button-secondary button-sm">
                  Admin
                </NavLink>
              </div>
            </>
          )}
        </nav>
      )}

      <main>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<PublicHomePage />} />
          <Route path="/kamper" element={<PublicMatchesPage />} />
          <Route path="/lag" element={<PublicTeamsPage />} />

          {/* Auth routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Admin routes (protected) */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute requireAdmin>
                <AdminMatchesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/teams"
            element={
              <ProtectedRoute requireAdmin>
                <AdminTeamsPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </div>
  )
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  )
}

export default App
