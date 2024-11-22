/* eslint-disable @typescript-eslint/no-unused-vars */
import type { IDriverRepository } from '@/repositories/driver-repository'
import type { IRideRepository } from '@/repositories/ride-repository'
import { InvalidDriverError } from './errors/invalid-driver-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import type { Ride, Driver } from '@prisma/client'

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

  private validateRides(rides: (Ride & { driver: Driver })[]): void {
    if (rides.length === 0) {
      throw new ResourceNotFoundError()
    }
  }

  private mapRides(
    rides: (Ride & { driver: Driver })[],
  ): IRideUseCaseResponse['rides'] {
    return rides.map(({ created_at, driver, ...rest }) => ({
      ...rest,
      date: created_at,
      driver: { id: driver.id, name: driver.name },
    }))
  }

  async execute({
    customerId,
    driverId,
  }: IRideUseCaseRequest): Promise<IRideUseCaseResponse> {
    let rides: (Ride & { driver: Driver })[]

    if (driverId) {
      const driver = await this.driverRepository.findById(driverId)

      if (!driver) {
        throw new InvalidDriverError()
      }

      rides = await this.rideRepository.findByCustomerAndDriverId({
        customerId,
        driverId,
      })
    } else {
      rides = await this.rideRepository.findByCustomerId(customerId)
    }

    this.validateRides(rides)
    const newRides = this.mapRides(rides)

    return {
      customer_id: customerId,
      rides: newRides,
    }
  }
}
