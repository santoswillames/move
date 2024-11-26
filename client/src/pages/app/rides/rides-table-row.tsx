import { TableRow, TableCell } from '@/components/ui/table'
import { CurrencyDisplay } from '@/utils/currency-display'
import { formatDistance } from '@/utils/format-distance'
import { formatDuration } from '@/utils/format-duration'

interface DataRide {
  ride: {
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
}

export function RidesTableRow({ ride }: DataRide) {
  return (
    <TableRow>
      <TableCell className="text-muted-foreground">{`${new Date(ride.date).toLocaleString()}`}</TableCell>
      <TableCell className="text-muted-foreground">{ride.origin}</TableCell>
      <TableCell className="text-muted-foreground">
        {ride.destination}
      </TableCell>
      <TableCell className="font-medium">{ride.driver.name}</TableCell>
      <TableCell className="font-medium">
        {CurrencyDisplay(ride.value)}
      </TableCell>
      <TableCell className="text-muted-foreground">
        {formatDistance(ride.distance)}
      </TableCell>
      <TableCell className="text-muted-foreground">
        {formatDuration(ride.duration)}
      </TableCell>
    </TableRow>
  )
}
