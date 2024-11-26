import { useContext } from 'react'
import { Outlet, Navigate } from 'react-router'
import { AuthContext } from './context/auth-context'

export function PrivateRoutes({ redirectTo = '/sign-in' }) {
  const { isAuthenticated } = useContext(AuthContext)

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} />
  }

  return <Outlet />
}
