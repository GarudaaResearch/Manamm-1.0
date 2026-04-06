import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import Landing      from './pages/Landing'
import Login        from './pages/Login'
import Dashboard    from './pages/Dashboard'
import ExperimentLab from './pages/ExperimentLab'
import WhatsAppAnalysis from './pages/WhatsAppAnalysis'
import AnnotationTool from './pages/AnnotationTool'
import AnalyzeText  from './pages/AnalyzeText'
import AdminPanel   from './pages/AdminPanel'
import ModelsTutorial from './pages/ModelsTutorial'
import SpeechTutorial  from './pages/SpeechTutorial'
import AboutSchool     from './pages/AboutSchool'
import CaseStudies     from './pages/CaseStudies'

function ProtectedRoute({ children, roles }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  if (roles && !roles.includes(user.role)) return <Navigate to="/dashboard" replace />
  return children
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/"          element={<Landing />} />
          <Route path="/login"     element={<Login />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/experiment" element={<ProtectedRoute><ExperimentLab /></ProtectedRoute>} />
          <Route path="/whatsapp"  element={<ProtectedRoute><WhatsAppAnalysis /></ProtectedRoute>} />
          <Route path="/annotate"  element={<ProtectedRoute><AnnotationTool /></ProtectedRoute>} />
          <Route path="/analyze"   element={<ProtectedRoute><AnalyzeText /></ProtectedRoute>} />
          <Route path="/tutorials" element={<ProtectedRoute><ModelsTutorial /></ProtectedRoute>} />
          <Route path="/speech"    element={<ProtectedRoute><SpeechTutorial /></ProtectedRoute>} />
          <Route path="/about"     element={<ProtectedRoute><AboutSchool /></ProtectedRoute>} />
          <Route path="/cases"     element={<ProtectedRoute><CaseStudies /></ProtectedRoute>} />
          <Route path="/admin"     element={<ProtectedRoute roles={['SUPER_ADMIN','ORG_ADMIN']}><AdminPanel /></ProtectedRoute>} />
          <Route path="*"          element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
