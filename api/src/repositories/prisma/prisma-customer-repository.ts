import { prisma } from '@/lib/prisma'
import type { Prisma } from '@prisma/client'
import type { ICustomerRepository } from '../customer-repository'

export class PrismaCustomersRepository implements ICustomerRepository {
  async create(data: Prisma.CustomerCreateInput) {
    const customer = await prisma.customer.create({
      data,
    })

    return customer
  }

  async findByEmail(email: string) {
    const customer = await prisma.customer.findUnique({
      where: {
        email,
      },
    })

    return customer
  }

  async findById(id: string) {
    const customer = await prisma.customer.findUnique({
      where: {
        id,
      },
    })

    return customer
  }
}
