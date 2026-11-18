import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import RequireAuth from '../components/auth/RequireAuth'
import RequireAdmin from '../components/auth/RequireAdmin'
import AdminLayout from '../components/admin/AdminLayout'
import HomePage from '../pages/HomePage'

const DestinationsPage = lazy(() => import('../pages/DestinationsPage'))
const DestinationDetailsPage = lazy(() => import('../pages/DestinationDetailsPage'))
const AboutPage = lazy(() => import('../pages/AboutPage'))
const GuidesPage = lazy(() => import('../pages/GuidesPage'))
const GuideDetailsPage = lazy(() => import('../pages/GuideDetailsPage'))
const PlannerPage = lazy(() => import('../pages/PlannerPage'))
const ItineraryDetailsPage = lazy(() => import('../pages/ItineraryDetailsPage'))
const ContactPage = lazy(() => import('../pages/ContactPage'))
const LoginPage = lazy(() => import('../pages/LoginPage'))
const SignUpPage = lazy(() => import('../pages/SignUpPage'))
const ProfilePage = lazy(() => import('../pages/ProfilePage'))
const FavouritesPage = lazy(() => import('../pages/FavouritesPage'))
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'))

const AdminDashboardPage = lazy(() => import('../pages/admin/AdminDashboardPage'))
const AdminDestinationsPage = lazy(() => import('../pages/admin/AdminDestinationsPage'))
const AdminDestinationFormPage = lazy(() => import('../pages/admin/AdminDestinationFormPage'))
const AdminCategoriesPage = lazy(() => import('../pages/admin/AdminCategoriesPage'))
const AdminCategoryFormPage = lazy(() => import('../pages/admin/AdminCategoryFormPage'))
const AdminPostsPage = lazy(() => import('../pages/admin/AdminPostsPage'))
const AdminPostFormPage = lazy(() => import('../pages/admin/AdminPostFormPage'))
const AdminFeedbackPage = lazy(() => import('../pages/admin/AdminFeedbackPage'))

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
            <Route path="guides" element={<AdminPostsPage />} />
            <Route path="guides/new" element={<AdminPostFormPage />} />
            <Route path="guides/:id/edit" element={<AdminPostFormPage />} />
            <Route path="feedback" element={<AdminFeedbackPage />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}