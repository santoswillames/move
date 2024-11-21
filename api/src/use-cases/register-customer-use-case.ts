import type { ICustomerRepository } from '@/repositories/customer-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import bcrypt from 'bcryptjs'

interface IRegisterCustomerUseCaseRequest {
  name: string
  email: string
  password: string
}

export class RegisterCustomerUseCase {
  constructor(private usersRepository: ICustomerRepository) {}

  async execute({ name, email, password }: IRegisterCustomerUseCaseRequest) {
    const password_hash = await bcrypt.hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    await this.usersRepository.create({
      name,
      email,
      password_hash,
    })
  }
}
