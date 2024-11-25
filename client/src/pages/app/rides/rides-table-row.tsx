import { TableRow, TableCell } from '@/components/ui/table'

export function RidesTableRow() {
  return (
    <TableRow>
      <TableCell className="text-muted-foreground">25/11/2024 09:00</TableCell>
      <TableCell className="text-muted-foreground">
        Avenida Central, 1095 - Jardim Planalto - São Sebastião do Paraíso - MG
      </TableCell>
      <TableCell className="text-muted-foreground">
        Avenida Central, 1095 - Jardim Planalto - São Sebastião do Paraíso - MG
      </TableCell>
      <TableCell className="font-medium">Homer Simpsons</TableCell>
      <TableCell className="font-medium">R$ 1.320,90</TableCell>
      <TableCell className="text-muted-foreground">325km</TableCell>
      <TableCell className="text-muted-foreground">40 min</TableCell>
    </TableRow>
  )
}
