import type { Driver } from '@prisma/client'

export interface IDriverRepository {
  findByCompatibleKm(minKm: number): Promise<Driver[]>
  findById(id: number): Promise<Driver | null>
}
