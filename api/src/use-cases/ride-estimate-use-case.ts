import type { IDriverRepository } from '@/repositories/driver-repository'
import type {
  GoogleApiResponse,
  GoogleApiService,
} from '@/services/google-api-service'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface IRideEstimateRequest {
  origin: string
  destination: string
}

interface IRideEstimateResponse {
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

export class RideEstimateUseCase {
  constructor(
    private googleApiService: GoogleApiService,
    private driverRepository: IDriverRepository,
  ) {}

  async execute({
    origin,
    destination,
  }: IRideEstimateRequest): Promise<IRideEstimateResponse> {
    const directions = await this.googleApiService.getDirections(
      origin,
      destination,
    )

    if (Object.keys(directions).length === 0) {
      throw new ResourceNotFoundError()
    }

    const drivers = await this.driverRepository.findByCompatibleKm(
      directions.routes[0].distanceMeters / 1000,
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
          value: value * (directions.routes[0].distanceMeters / 1000),
        }
      },
    )

    return {
      origin: {
        latitude: directions.routes[0].legs[0].startLocation.latLng.latitude,
        longitude: directions.routes[0].legs[0].startLocation.latLng.longitude,
      },
      destination: {
        latitude: directions.routes[0].legs[0].endLocation.latLng.latitude,
        longitude: directions.routes[0].legs[0].endLocation.latLng.longitude,
      },
      distance: directions.routes[0].distanceMeters,
      duration: directions.routes[0].duration,
      options: driversCalculate,
      routeResponse: directions,
    }
  }
}
