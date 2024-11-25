import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router'
import { toast } from 'sonner'
import { z } from 'zod'

const requestRideForm = z.object({
  origin: z.string().email(),
  destination: z.string().min(6),
})

type RequestRideForm = z.infer<typeof requestRideForm>

export function FormRequestRide() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<RequestRideForm>()

  async function handleRequestRide(data: RequestRideForm) {
    console.log(data)
    await new Promise((resolve) => setTimeout(resolve, 3000))

    toast.success('FEito')
  }

  return (
    <div className="p-8">
      <div className="flex max-w-96 flex-col justify-center gap-6">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Definir trajeto
          </h1>
          <p className="text-sm text-muted-foreground">
            Preencha o formulário com a origem e o destino do seu trajeto para
            mostrar as opções de viagem.
          </p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit(handleRequestRide)}>
          <div className="space-y-2">
            <Label htmlFor="origin">Origem</Label>
            <Input
              type="text"
              id="origin"
              placeholder="Av. Paulista, 33 - São Paulo - SP"
              {...register('origin')}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="destination">Destino</Label>
            <Input
              type="text"
              id="destination"
              placeholder="Av. Brig. Faria Lima, 2236 - Jardim Paulistano - São Paulo - SP"
              {...register('destination')}
            />
          </div>

          <Button className="w-full" type="submit" disabled={isSubmitting}>
            Calcular rota
          </Button>
        </form>
      </div>
    </div>
  )
}
