import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { DriversTableRow } from './drivers-table-row'
import type { DataRide } from '../confirm-ride'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Loader } from 'lucide-react'
import { api } from '@/services/api'
import { toast } from 'sonner'

interface IListDriverProps {
  dataRide: DataRide
}

export type Driver = {
  id: number
  name: string
  value: number
}

export function ListDriver({ dataRide }: IListDriverProps) {
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  async function handleConfirmRide({ id, name, value }: Driver) {
    try {
      setLoading(true)
      await api.patch('/ride/confirm', {
        origin: dataRide.inputOrigin,
        destination: dataRide.inputDestination,
        distance: dataRide.distance,
        duration: dataRide.duration,
        driver: {
          id,
          name,
        },
        value,
      })
      navigate('/rides')
      toast.success('Viagem confirmada com sucesso!')
    } catch (error) {
      console.log(error)
      toast.error('Erro ao confirmar viagem.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex-1">
      {loading ? (
        <div className="flex h-72 flex-col items-center justify-center">
          <Loader className="h-6 w-6" />
          <p className="p-5 font-medium text-muted-foreground">
            Confirmando viagem...
          </p>
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Motorista</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead className="w-[124px]">Veículo</TableHead>
                <TableHead className="w-[200px]">Avaliação</TableHead>
                <TableHead className="w-[124px]">Custo</TableHead>
                <TableHead className="w-[40px]" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {dataRide.options.map((driver) => (
                <DriversTableRow
                  key={driver.id}
                  driver={driver}
                  handleConfirmRide={handleConfirmRide}
                />
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}
