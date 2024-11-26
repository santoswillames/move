import { api } from '@/services/api'
import { createContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'

export type Storage = {
  token: string
  email: string
}

type User = {
  email: string
}

type SignInCredentials = {
  email: string
  password: string
}

type AuthContextData = {
  signIn(credentials: SignInCredentials): Promise<void>
  isAuthenticated: boolean
  user: User
}

type AuthProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState({} as User)
  const navigate = useNavigate()
  const isAuthenticated = !!user

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      const userDataJson: Storage = JSON.parse(userData)
      setUser({ email: userDataJson.email })
    }
  }, [])

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post('/sessions', { email, password })
      const { token } = response.data
      localStorage.setItem('user', JSON.stringify({ token, email }))
      setUser({ email })
      // biome-ignore lint/complexity/useLiteralKeys: <explanation>
      api.defaults.headers['Authorization'] = `Bearer ${token}`
      navigate('/')
    } catch (error) {
      toast.error('Credenciais inválidas')
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, user }}>
      {children}
    </AuthContext.Provider>
  )
}
