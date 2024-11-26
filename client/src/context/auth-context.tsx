import { api } from '@/services/api'
import { createContext } from 'react'
import type { ReactNode } from 'react'

type SignInCredentials = {
  email: string
  password: string
}

type AuthContextData = {
  signIn(credentials: SignInCredentials): Promise<void>
  isAuthenticated: boolean
}

type AuthProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const isAuthenticated = false

  async function signIn({ email, password }: SignInCredentials) {
    const response = await api.post('/sessions', { email, password })

    console.log(response.data)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  )
}
