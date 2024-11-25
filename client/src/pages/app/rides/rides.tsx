import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { RidesTableRow } from './rides-table-row'
import { RidesTableFilters } from './rides-table-filters'
import { Paginations } from '@/components/paginations'

export function Rides() {
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
              {Array.from({ length: 10 }).map((_, i) => (
                <RidesTableRow key={i} />
              ))}
            </TableBody>
          </Table>
        </div>
        <Paginations pageIndex={0} perPage={10} totalCount={105} />
      </div>
    </div>
  )
}
