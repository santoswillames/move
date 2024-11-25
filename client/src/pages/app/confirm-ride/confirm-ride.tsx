import { ListDriver } from './list-driver/list-driver'
import { MapRide } from './map-ride'

export function ConfirmRide() {
  return (
    <div className="flex min-h-screen flex-wrap gap-1 antialiased">
      <MapRide />
      <ListDriver />
    </div>
  )
}
