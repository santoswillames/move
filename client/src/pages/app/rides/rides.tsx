import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { RidesTableRow } from './rides-table-row'
import { RidesTableFilters } from './rides-table-filters'
import { useEffect, useState } from 'react'
import { api } from '@/services/api'
import { useSearchParams } from 'react-router'
import { capitalize } from '@/utils/format-string-capitalize'

interface DataRides {
  id: string
  date: Date
  origin: string
  destination: string
  distance: number
  duration: string
  driver: {
    id: number
    name: string
  }
  value: number
}

export function Rides() {
  const [dataRides, setDataRides] = useState<DataRides[] | []>([])
  const [searchParams, setSearchParams] = useSearchParams()

  const driverName = searchParams.get('driverName')

  if (driverName) {
    const drivers = dataRides.map(({ driver }) => driver)
    const drive = drivers.find((el) => el.name.includes(capitalize(driverName)))
    console.log(drive)
  }

  useEffect(() => {
    async function fetchRides() {
      const response = await api.get('/ride')
      setDataRides(response.data.rides)
    }
    fetchRides()
  }, [])

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
              {dataRides.map((ride) => (
                <RidesTableRow key={ride.id} ride={ride} />
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
