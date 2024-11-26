import type { Storage } from '@/context/auth-context'
import { env } from '@/env'
import axios from 'axios'

// biome-ignore lint/suspicious/noImplicitAnyLet: <explanation>
let token
const tokenString = localStorage.getItem('user')

if (tokenString) {
  const user: Storage = JSON.parse(tokenString)
  token = user.token
}

export const api = axios.create({
  baseURL: env.VITE_API_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
