import { Link, useLocation } from 'react-router'
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
  if (!location.state) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-2">
        <h1 className="text-4xl font-bold">Dados não encontrados</h1>
        <p className="text-accent-foreground">
          Voltar para o{' '}
          <Link to="/" className="text-sky-600 dark:text-sky-400">
            Início
          </Link>
        </p>
      </div>
    )
  }
  const { dataRide }: ConfirmRideParams = location.state

  return (
    <div className="flex min-h-screen flex-wrap gap-1 antialiased">
      <MapRide origin={dataRide.origin} destination={dataRide.destination} />
      <ListDriver dataRide={dataRide} />
    </div>
  )
}
