import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { DriversTableRow } from './drivers-table-row'

export function ListDriver() {
  return (
    <div className="flex-1">
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
            {Array.from({ length: 3 }).map((_, i) => (
              <DriversTableRow key={i} />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
