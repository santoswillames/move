import type { IDriverRepository } from '@/repositories/driver-repository'
import type {
  GoogleApiResponse,
  GoogleApiService,
} from '@/services/google-api-service'

interface IRideDirectionsRequest {
  origin: string
  destination: string
}

interface IRideDirectionsResponse {
  origin: {
    latitude: number
    longitude: number
  }
  destination: {
    latitude: number
    longitude: number
  }
  distance: number
  duration: string
  options: Array<{
    id: number
    name: string
    description: string
    vehicle: string
    review: {
      rating: number
      comment: string
    }
    value: number
  }>
  routeResponse: GoogleApiResponse
}

export class RideDirectionsUseCase {
  constructor(
    private googleApiService: GoogleApiService,
    private driverRepository: IDriverRepository,
  ) {}

  async execute({
    origin,
    destination,
  }: IRideDirectionsRequest): Promise<IRideDirectionsResponse> {
    const directions = await this.googleApiService.getDirections(
      origin,
      destination,
    )

    const drivers = await this.driverRepository.findByCompatibleKm(
      directions.routes[0].distanceMeters,
    )

    const driversCalculate = drivers.map(
      ({ id, name, description, vehicle, rating, comment, value }) => {
        return {
          id,
          name,
          description,
          vehicle,
          review: {
            rating,
            comment,
          },
          value: value * directions.routes[0].distanceMeters,
        }
      },
    )

    return {
      origin: {
        latitude: directions.routes[0].legs[0].startLocation.latitude,
        longitude: directions.routes[0].legs[0].startLocation.longitude,
      },
      destination: {
        latitude: directions.routes[0].legs[0].endLocation.latitude,
        longitude: directions.routes[0].legs[0].endLocation.longitude,
      },
      distance: directions.routes[0].distanceMeters,
      duration: directions.routes[0].duration.value,
      options: driversCalculate,
      routeResponse: directions,
    }
  }
}
