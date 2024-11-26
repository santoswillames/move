import { env } from '@/env'

const googleKey = env.VITE_GOOGLE_API_KEY

export function MapRide() {
  return (
    <div className="mr-2">
      <img
        src={`https://maps.googleapis.com/maps/api/staticmap?size=400x400&path=-20.91572778384368,-46.96446026277947|-20.904648607195767,-46.98670977909532&key=${googleKey}`}
        alt="Imagem do mapa"
        className="rounded-md border-2 border-muted"
      />
    </div>
  )
}
