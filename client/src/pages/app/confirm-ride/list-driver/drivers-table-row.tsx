import { Button } from '@/components/ui/button'
import { TableRow, TableCell } from '@/components/ui/table'

export function DriversTableRow() {
  return (
    <TableRow>
      <TableCell className="font-medium">Homer Simpsons</TableCell>
      <TableCell className="text-muted-foreground">
        Olá! Sou o Homer, seu motorista camarada! Relaxe e aproveite o passeio,
        com direito a rosquinhas e boas risadas (e talvez alguns desvios).
      </TableCell>
      <TableCell className="text-muted-foreground">
        Plymouth Valiant 1973 rosa e enferrujado
      </TableCell>
      <TableCell className="text-muted-foreground">
        2/5 - Motorista simpático, mas errou o caminho 3 vezes. O carro cheira a
        donuts.
      </TableCell>
      <TableCell className="font-medium">R$ 1.320,90</TableCell>
      <TableCell className="text-muted-foreground">
        <Button variant="outline" size="sm">
          Confirmar
        </Button>
      </TableCell>
    </TableRow>
  )
}
