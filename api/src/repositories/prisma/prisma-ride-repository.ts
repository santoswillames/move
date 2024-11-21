import type { Prisma } from '@prisma/client'
import type {
  IFindByCustomerAndDriverId,
  IRideRepository,
} from '../ride-repository'
import { prisma } from '@/lib/prisma'

export class PrismaRideRepository implements IRideRepository {
  async create(data: Prisma.RideCreateInput) {
    const ride = await prisma.ride.create({
      data,
    })

    return ride
  }

  async findByCustomerAndDriverId({
    customerId,
    driverId,
  }: IFindByCustomerAndDriverId) {
    const rides = await prisma.ride.findMany({
      where: {
        customer_id: customerId,
        driver_id: driverId,
      },
      orderBy: {
        created_at: 'desc',
      },
    })

    return rides
  }

  async findByCustomerId(customer_id: string) {
    const rides = await prisma.ride.findMany({
      where: {
        customer_id,
      },
      orderBy: {
        created_at: 'desc',
      },
    })

    return rides
  }
}
