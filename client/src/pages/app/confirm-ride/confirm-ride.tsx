import { useLocation } from 'react-router'
import { ListDriver } from './list-driver/list-driver'
import { MapRide } from './map-ride'
import type { IRideEstimateResponse } from '@/@types/response-api'

export type DataRide = {
  inputOrigin: string
  inputDestination: string
} & IRideEstimateResponse

interface ConfirmRideParams {
  dataRide: DataRide
}

export function ConfirmRide() {
  const location = useLocation()
  const { dataRide }: ConfirmRideParams = location.state

  return (
    <div className="flex min-h-screen flex-wrap gap-1 antialiased">
      <MapRide origin={dataRide.origin} destination={dataRide.destination} />
      <ListDriver dataRide={dataRide} />
    </div>
  )
}
