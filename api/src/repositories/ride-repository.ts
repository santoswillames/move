import type { Prisma, Ride } from '@prisma/client'

export interface IFindByCustomerAndDriverId {
  customerId: string
  driverId: number
}

export interface IRideRepository {
  create(data: Prisma.RideCreateInput): Promise<Ride>
  findByCustomerAndDriverId({
    customerId,
    driverId,
  }: IFindByCustomerAndDriverId): Promise<Ride[]>
  findByCustomerId(customer_id: string): Promise<Ride[]>
}
