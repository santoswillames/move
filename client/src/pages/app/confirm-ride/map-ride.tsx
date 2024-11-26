import { env } from '@/env'

interface IMapRideProps {
  origin: {
    latitude: number
    longitude: number
  }
  destination: {
    latitude: number
    longitude: number
  }
}

const googleKey = env.VITE_GOOGLE_API_KEY

export function MapRide({ origin, destination }: IMapRideProps) {
  return (
    <div className="mr-2">
      <img
        src={`https://maps.googleapis.com/maps/api/staticmap?size=400x400&path=${origin.latitude},${origin.longitude}|${destination.latitude},${destination.longitude}&key=${googleKey}`}
        alt="Imagem do mapa"
        className="rounded-md border-2 border-muted"
      />
    </div>
  )
}
