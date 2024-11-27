import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { RidesTableRow } from './rides-table-row'
import { RidesTableFilters } from './rides-table-filters'
import { api } from '@/services/api'
import { useSearchParams } from 'react-router'
import { capitalize } from '@/utils/format-string-capitalize'
import { useQuery } from '@tanstack/react-query'
import type { IRidesResponse } from '@/@types/response-api'

export function Rides() {
  const [searchParams] = useSearchParams()

  const driverName = searchParams.get('driverName')
  console.log('NAME', driverName)

  const { data: result } = useQuery({
    queryKey: ['rides', driverName],
    queryFn: fetchRides,
  })

  async function fetchRides(): Promise<IRidesResponse> {
    const { data } = await api.get<IRidesResponse>('/ride')
    if (driverName) {
      const drivers = data.rides.map(({ driver }) => driver)
      const drive = drivers.find((el) =>
        el.name.includes(capitalize(driverName)),
      )
      console.log(drive)
      const response = await api.get<IRidesResponse>(
        `/ride?driver_id=${drive?.id}`,
      )

      return response.data
    }
    return data
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold tracking-tight">
        Histórico de passeios
      </h1>

      <div className="space-y-2.5">
        <RidesTableFilters />

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[138px]">Data</TableHead>
                <TableHead>Origem</TableHead>
                <TableHead>Destino</TableHead>
                <TableHead>Motorista</TableHead>
                <TableHead className="w-[124px]">Custo</TableHead>
                <TableHead className="w-[40px]">Distância</TableHead>
                <TableHead className="w-[40px]">Duração</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {result?.rides.map((ride) => {
                return <RidesTableRow key={ride.id} ride={ride} />
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
