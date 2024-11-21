import type { IDriverRepository } from '../driver-repository'
import { prisma } from '@/lib/prisma'

export class PrismaDriverRepository implements IDriverRepository {
  async findById(id: number) {
    const driver = await prisma.driver.findUnique({
      where: {
        id,
      },
    })

    return driver
  }

  async list() {
    const drivers = await prisma.driver.findMany()
    return drivers
  }
}
