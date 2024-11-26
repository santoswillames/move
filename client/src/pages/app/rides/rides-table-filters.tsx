import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { Search, X } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router'
import { z } from 'zod'

const searchForm = z.object({
  name: z.string().min(1),
})

type SearchForm = z.infer<typeof searchForm>

export function RidesTableFilters() {
  const [searchParams, setSearchParams] = useSearchParams()

  const driverName = searchParams.get('driverName')

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<SearchForm>({
    resolver: zodResolver(searchForm),
    defaultValues: {
      name: driverName ?? '',
    },
  })

  function handleFilterDriver({ name }: SearchForm) {
    setSearchParams((prev) => {
      prev.set('driverName', name)
      return prev
    })
  }

  function handleClearFilters() {
    setSearchParams((prev) => {
      prev.delete('driverName')
      return prev
    })
    reset({ name: '' })
  }

  return (
    <form
      className="flex items-center gap-2"
      onSubmit={handleSubmit(handleFilterDriver)}
    >
      <span className="text-sm font-semibold">Filtros:</span>
      <Input
        placeholder="Nome do motorista"
        className="h-8 w-[320px]"
        type="name"
        id="name"
        {...register('name')}
      />
      <Button
        type="submit"
        variant="secondary"
        size="sm"
        disabled={isSubmitting}
      >
        <Search className="mr-2 h-4 w-4" />
        Filtrar resultados
      </Button>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={handleClearFilters}
        disabled={!driverName}
      >
        <X className="mr-2 h-4 w-4" />
        Remover filtros
      </Button>
    </form>
  )
}
