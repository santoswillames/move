import { useForm } from 'react-hook-form'
import { Link } from 'react-router'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const signInForm = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

type SignInForm = z.infer<typeof signInForm>

export function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInForm>()

  async function handleSignIn(data: SignInForm) {
    console.log(data)
    await new Promise((resolve) => setTimeout(resolve, 3000))

    toast.success('FEito')
  }

  return (
    <div className="p-8">
      <Button variant="ghost" asChild className="absolute right-8 top-8">
        <Link to="/sign-up">Cadastre-se</Link>
      </Button>
      <div className="flex w-[350px] flex-col justify-center gap-6">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Acessar painel
          </h1>
          <p className="text-sm text-muted-foreground">
            Escolha seu destino, faça seu passeio e acesse seu histórico.
          </p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit(handleSignIn)}>
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              type="email"
              id="email"
              placeholder="examplo@gmail.com"
              {...register('email')}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              type="password"
              id="password"
              placeholder="Senha"
              {...register('password')}
            />
          </div>

          <Button className="w-full" type="submit" disabled={isSubmitting}>
            Entrar
          </Button>
        </form>
      </div>
    </div>
  )
}
