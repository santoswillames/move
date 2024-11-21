import type { Prisma, Customer } from '@prisma/client'

export interface ICustomerRepository {
  findById(id: string): Promise<Customer | null>
  findByEmail(email: string): Promise<Customer | null>
  create(data: Prisma.CustomerCreateInput): Promise<Customer>
}
