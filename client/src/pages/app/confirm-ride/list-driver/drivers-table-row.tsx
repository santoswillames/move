import type { IRideEstimateResponse } from '@/@types/response-api'
import { Button } from '@/components/ui/button'
import { TableRow, TableCell } from '@/components/ui/table'
import { CurrencyDisplay } from '@/utils/currency-display'
import type { Driver } from './list-driver'

interface DriversTableRowProps {
  driver: IRideEstimateResponse['options'][number]
  handleConfirmRide({ id, name }: Driver): Promise<void>
}

export function DriversTableRow({
  driver,
  handleConfirmRide,
}: DriversTableRowProps) {
  return (
    <TableRow>
      <TableCell className="font-medium">{driver.name}</TableCell>
      <TableCell className="text-muted-foreground">
        {driver.description}
      </TableCell>
      <TableCell className="text-muted-foreground">{driver.vehicle}</TableCell>
      <TableCell className="text-muted-foreground">
        {`${driver.review.rating}/5`} - {driver.review.comment}
      </TableCell>
      <TableCell className="font-medium">
        {CurrencyDisplay(Number(driver.value))}
      </TableCell>
      <TableCell className="text-muted-foreground">
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            handleConfirmRide({
              id: driver.id,
              name: driver.name,
              value: driver.value,
            })
          }
        >
          Escolher
        </Button>
      </TableCell>
    </TableRow>
  )
}
