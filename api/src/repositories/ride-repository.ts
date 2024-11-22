import type { Driver, Prisma, Ride } from '@prisma/client'

export interface IFindByCustomerAndDriverId {
  customerId: string
  driverId: number
}

export interface IRideRepository {
  create(data: Prisma.RideCreateInput): Promise<Ride>
  findByCustomerAndDriverId({
    customerId,
    driverId,
  }: IFindByCustomerAndDriverId): Promise<(Ride & { driver: Driver })[]>
  findByCustomerId(customerId: string): Promise<(Ride & { driver: Driver })[]>
}
