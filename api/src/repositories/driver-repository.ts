import type { Driver } from '@prisma/client'

export interface IDriverRepository {
  findById(id: number): Promise<Driver | null>
  list(): Promise<Driver[]>
}
