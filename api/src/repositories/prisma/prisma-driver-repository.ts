import type { IDriverRepository } from '../driver-repository'
import { prisma } from '@/lib/prisma'

export class PrismaDriverRepository implements IDriverRepository {
  async findByCompatibleKm(minKm: number) {
    const drivers = await prisma.driver.findMany({
      where: {
        minKm: {
          lte: minKm,
        },
      },
      orderBy: {
        minKm: 'asc',
      },
    })

    return drivers
  }

  async findById(id: number) {
    const driver = await prisma.driver.findUnique({
      where: {
        id,
      },
    })

    return driver
  }
}
