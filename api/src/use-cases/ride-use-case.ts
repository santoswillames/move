/* eslint-disable @typescript-eslint/no-unused-vars */
import type { IDriverRepository } from '@/repositories/driver-repository'
import type { IRideRepository } from '@/repositories/ride-repository'
import { InvalidDriverError } from './errors/invalid-driver-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface IRideUseCaseRequest {
  customerId: string
  driverId?: number
}

interface IRideUseCaseResponse {
  customer_id: string
  rides: Array<{
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
  }>
}

export class RideUseCase {
  constructor(
    private rideRepository: IRideRepository,
    private driverRepository: IDriverRepository,
  ) {}

  async execute({
    customerId,
    driverId,
  }: IRideUseCaseRequest): Promise<IRideUseCaseResponse> {
    if (driverId) {
      const driver = await this.driverRepository.findById(driverId)

      if (!driver) {
        throw new InvalidDriverError()
      }

      const rides = await this.rideRepository.findByCustomerAndDriverId({
        customerId,
        driverId,
      })

      if (rides.length === 0) {
        throw new ResourceNotFoundError()
      }

      const newRides = rides.map(
        ({ updated_at, created_at, driver_id, customer_id, ...rest }) => ({
          ...rest,
          date: created_at,
        }),
      )

      return {
        customer_id: customerId,
        rides: newRides,
      }
    }

    const rides = await this.rideRepository.findByCustomerId(customerId)
    console.log(rides)

    if (rides.length === 0) {
      throw new ResourceNotFoundError()
    }

    const newRides = rides.map(
      ({ updated_at, created_at, driver_id, customer_id, ...rest }) => ({
        ...rest,
        date: created_at,
      }),
    )

    return {
      customer_id: customerId,
      rides: newRides,
    }
  }
}
