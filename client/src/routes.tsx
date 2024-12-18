import { Route, Routes } from 'react-router'

import { AppLayout } from './pages/_layouts/app'
import { AuthLayout } from './pages/_layouts/auth'
import { Home } from './pages/app/home/home'
import { SignIn } from './pages/auth/sign-in'
import { SignUp } from './pages/auth/sign-up'
import { Rides } from './pages/app/rides/rides'
import { NotFound } from './pages/404'
import { ConfirmRide } from './pages/app/confirm-ride/confirm-ride'
import { PrivateRoutes } from './private-routes'

export function Router() {
  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/rides" element={<Rides />} />
          <Route path="/confirm-ride" element={<ConfirmRide />} />
        </Route>
      </Route>
      <Route element={<AuthLayout />}>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
