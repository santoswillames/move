import { useLocation } from 'react-router'
import { ListDriver } from './list-driver/list-driver'
import { MapRide } from './map-ride'

export function ConfirmRide() {
  const location = useLocation()
  const dataRide = location.state
  console.log('Data', dataRide)

  return (
    <div className="flex min-h-screen flex-wrap gap-1 antialiased">
      <MapRide />
      <ListDriver />
    </div>
  )
}
