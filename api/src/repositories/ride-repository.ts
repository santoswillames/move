import type { Prisma, Ride } from '@prisma/client'

export interface IFindByCustomerAndDriverId {
  customerId: string
  driverId: number
}

interface IDriver {
  id: number
  name: string
}

export interface IRideRepository {
  create(data: Prisma.RideCreateInput): Promise<Ride>
  findByCustomerAndDriverId({
    customerId,
    driverId,
  }: IFindByCustomerAndDriverId): Promise<(Ride & { driver: IDriver })[]>
  findByCustomerId(customerId: string): Promise<(Ride & { driver: IDriver })[]>
}
