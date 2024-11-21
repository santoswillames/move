import type { ICustomerRepository } from '@/repositories/customer-repository'
import { InvalidCredentialsError } from './errors/invalid-crendentials-error'
import bcrypt from 'bcryptjs'
import type { Customer } from '@prisma/client'

interface IAuthenticateUseCaseRequest {
  email: string
  password: string
}

interface IAuthenticateUseCaseResponse {
  customer: Customer
}

export class AuthenticateUseCase {
  constructor(private customersRepository: ICustomerRepository) {}

  async execute({
    email,
    password,
  }: IAuthenticateUseCaseRequest): Promise<IAuthenticateUseCaseResponse> {
    const customer = await this.customersRepository.findByEmail(email)

    if (!customer) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await bcrypt.compare(
      password,
      customer.password_hash,
    )

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return {
      customer,
    }
  }
}
