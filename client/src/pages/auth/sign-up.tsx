import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { zodResolver } from '@hookform/resolvers/zod'
import { api } from '@/services/api'

const signUpForm = z
  .object({
    name: z.string().min(3, { message: 'Campo obrigatório' }).trim(),
    email: z.string().email(),
    password: z
      .string()
      .min(6, { message: 'A senha deve conter no mínimo 6 dígitos' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas são diferentes',
    path: ['confirmPassword'],
  })

type SignUpForm = z.infer<typeof signUpForm>

export function SignUp() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpForm),
  })

  async function handleSignUp({ name, email, password }: SignUpForm) {
    try {
      await api.post('/customers', { name, email, password })

      toast.success('Cadastro realizado com sucesso!', {
        action: {
          label: 'Login',
          onClick: () => navigate('/sign-in'),
        },
      })
    } catch (error) {
      toast.error('Erro ao tentar realizar cadastro.')
    }
  }

  return (
    <div className="p-8">
      <Button variant="ghost" asChild className="absolute right-8 top-8">
        <Link to="/sign-in">Fazer Login</Link>
      </Button>
      <div className="flex w-[350px] flex-col justify-center gap-6">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Criar conta grátis
          </h1>
          <p className="text-sm text-muted-foreground">
            Faça seu cadastro para utilizar nossa plataforma de passeios.
          </p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit(handleSignUp)}>
          <div className="space-y-2">
            <Label htmlFor="email">Nome</Label>
            <Input
              type="name"
              id="name"
              placeholder="Como gostaria de ser chamado(a)?"
              {...register('name')}
            />
            {errors.name?.message && (
              <span className="text-sm text-rose-600 dark:text-rose-400">
                {errors.name.message}
              </span>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              type="email"
              id="email"
              placeholder="examplo@gmail.com"
              {...register('email')}
            />
            {errors.email?.message && (
              <span className="text-sm text-rose-600 dark:text-rose-400">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              type="password"
              id="password"
              placeholder="Escolha uma senha no min 6 dígitos"
              {...register('password')}
            />
            {errors.password?.message && (
              <span className="text-sm text-rose-600 dark:text-rose-400">
                {errors.password.message}
              </span>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirme sua senha</Label>
            <Input
              type="password"
              id="confirmPassword"
              placeholder="Confirme sua senha"
              {...register('confirmPassword')}
            />
            {errors.confirmPassword?.message && (
              <span className="text-sm text-rose-600 dark:text-rose-400">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          <Button className="w-full" type="submit" disabled={isSubmitting}>
            Finalizar cadastro
          </Button>
          <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
            Ao continuar, você concorda com nossos{' '}
            <a className="underline underline-offset-4" href="./sign-up">
              termos de serviço
            </a>{' '}
            e{' '}
            <a className="underline underline-offset-4" href="./sign-up">
              políticas de privacidade
            </a>
            .
          </p>
        </form>
      </div>
    </div>
  )
}
