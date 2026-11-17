import { Route, Routes } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import RequireAuth from '../components/auth/RequireAuth'
import RequireAdmin from '../components/auth/RequireAdmin'
import AdminLayout from '../components/admin/AdminLayout'
import HomePage from '../pages/HomePage'
import DestinationsPage from '../pages/DestinationsPage'
import DestinationDetailsPage from '../pages/DestinationDetailsPage'
import AboutPage from '../pages/AboutPage'
import GuidesPage from '../pages/GuidesPage'
import GuideDetailsPage from '../pages/GuideDetailsPage'
import PlannerPage from '../pages/PlannerPage'
import ItineraryDetailsPage from '../pages/ItineraryDetailsPage'
import ContactPage from '../pages/ContactPage'
import LoginPage from '../pages/LoginPage'
import SignUpPage from '../pages/SignUpPage'
import ProfilePage from '../pages/ProfilePage'
import FavouritesPage from '../pages/FavouritesPage'
import AdminDashboardPage from '../pages/admin/AdminDashboardPage'
import AdminDestinationsPage from '../pages/admin/AdminDestinationsPage'
import AdminDestinationFormPage from '../pages/admin/AdminDestinationFormPage'
import AdminCategoriesPage from '../pages/admin/AdminCategoriesPage'
import AdminCategoryFormPage from '../pages/admin/AdminCategoryFormPage'
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
        <Route path="planner" element={<PlannerPage />} />
        <Route path="planner/:slug" element={<ItineraryDetailsPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignUpPage />} />

        {/* Pages that need a signed-in user */}
        <Route element={<RequireAuth />}>
          <Route path="profile" element={<ProfilePage />} />
          <Route path="favourites" element={<FavouritesPage />} />
        </Route>

        {/* Administrators only */}
        <Route element={<RequireAdmin />}>
          <Route path="admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboardPage />} />
            <Route path="destinations" element={<AdminDestinationsPage />} />
            <Route path="destinations/new" element={<AdminDestinationFormPage />} />
            <Route path="destinations/:id/edit" element={<AdminDestinationFormPage />} />
            <Route path="categories" element={<AdminCategoriesPage />} />
            <Route path="categories/new" element={<AdminCategoryFormPage />} />
            <Route path="categories/:id/edit" element={<AdminCategoryFormPage />} />
            <Route path="guides" element={<PlaceholderPage title="Manage guides" />} />
            <Route path="feedback" element={<PlaceholderPage title="Feedback" />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}