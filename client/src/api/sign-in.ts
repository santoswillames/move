import { api } from '@/lib/axios'

export interface SignInBody {
  email: string
  password: string
}

interface SignInResponse {
  token: string
}

export async function singIn({
  email,
  password,
}: SignInBody): Promise<SignInResponse> {
  const response = await api.post('/sessions', { email, password })

  const { token } = response.data
  return token
}
