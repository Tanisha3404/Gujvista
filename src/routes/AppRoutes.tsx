import { Route, Routes } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import HomePage from '../pages/HomePage'
import DestinationsPage from '../pages/DestinationsPage'
import DestinationDetailsPage from '../pages/DestinationDetailsPage'
import AboutPage from '../pages/AboutPage'
import GuidesPage from '../pages/GuidesPage'
import GuideDetailsPage from '../pages/GuideDetailsPage'
import NotFoundPage from '../pages/NotFoundPage'
import PlaceholderPage from '../pages/PlaceholderPage'

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="destinations" element={<DestinationsPage />} />
        <Route path="destinations/:slug" element={<DestinationDetailsPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="guides" element={<GuidesPage />} />
        <Route path="guides/:slug" element={<GuideDetailsPage />} />
        <Route path="planner" element={<PlaceholderPage title="Travel Planner" />} />
        <Route path="contact" element={<PlaceholderPage title="Contact & Feedback" />} />
        <Route path="login" element={<PlaceholderPage title="Login" />} />
        <Route path="signup" element={<PlaceholderPage title="Sign Up" />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}