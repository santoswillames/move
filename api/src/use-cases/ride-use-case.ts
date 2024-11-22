import { IDriverRepository } from '@/repositories/driver-repository'
import { IRideRepository } from '@/repositories/ride-repository'

interface IRideUseCaseRequest {
  customerId: string
  driverId?: number
}

interface IRideUseCaseResponse {
  customer_id: string
  rides: Array<{
    id: string
    date: Date
    origin: string
    destination: string
    distance: number
    duration: string
    driver: {
      id: number
      name: string
    }
    value: number
  }>
}

export class RideUseCase {
  constructor(
    private rideRepository: IRideRepository,
    private driverRepository: IDriverRepository,
  ) {}

  async execute({
    customerId,
    driverId,
  }: IRideUseCaseRequest): Promise<IRideUseCaseResponse> {
    // Se vier o driver verificar se o driver existe
    // Se não existir lançar uma exeção INVALID_DRIVER
    // se existir chamar o método findByCustomerAndDriverId
    // Se não vier chamar o método findByCustomerId
    // Se o array retornar vazio lançar uma exeção NO_RIDES_FOUND
  }
}
