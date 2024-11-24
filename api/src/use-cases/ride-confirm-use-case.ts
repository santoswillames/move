import type { IDriverRepository } from '@/repositories/driver-repository'
import type { IRideRepository } from '@/repositories/ride-repository'
import type { Prisma } from '@prisma/client'
import { InvalidDriverError } from './errors/invalid-driver-error'
import { InvalidDistanceError } from './errors/invalid-distance-error'

interface IRideConfirmUseCaseRequest {
  customer_id: string
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

interface IRideConfirmUseCaseResponse {
  success: boolean
}

export class RideConfirmUseCase {
  constructor(
    private rideRepository: IRideRepository,
    private driverRepository: IDriverRepository,
  ) {}

  async execute({
    customer_id,
    origin,
    destination,
    distance,
    duration,
    driver: driverRequest,
    value,
  }: IRideConfirmUseCaseRequest): Promise<IRideConfirmUseCaseResponse> {
    const driver = await this.driverRepository.findById(driverRequest.id)

    if (!driver) {
      throw new InvalidDriverError()
    }

    if (distance < driver.minKm) {
      throw new InvalidDistanceError()
    }

    const data: Prisma.RideCreateInput = {
      customer: {
        connect: { id: customer_id },
      },
      driver: {
        connect: { id: driverRequest.id },
      },
      origin,
      destination,
      distance,
      duration,
      value,
    }

    await this.rideRepository.create(data)

    return {
      success: true,
    }
  }
}
