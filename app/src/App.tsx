import { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useAuthStore } from './store/useAuthStore'
import Layout from './components/Layout'
import { RequireAuth } from './components/ProtectedRoute'
import AuthPage from './pages/AuthPage'
import OnboardingPage from './pages/OnboardingPage'
import DashboardPage from './pages/DashboardPage'
import MealLogPage from './pages/MealLogPage'
import HistoryPage from './pages/HistoryPage'
import AdvicePage from './pages/AdvicePage'
import SettingsPage from './pages/SettingsPage'
import PricingPage from './pages/PricingPage'

function App() {
  const init = useAuthStore((s) => s.init)

  useEffect(() => {
    init()
  }, [init])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<AuthPage />} />
        <Route path="/signup" element={<AuthPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route
          element={
            <RequireAuth>
              <Layout />
            </RequireAuth>
          }
        >
          <Route path="/" element={<DashboardPage />} />
          <Route path="/log" element={<MealLogPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/advice" element={<AdvicePage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
