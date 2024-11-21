import { PrismaCustomersRepository } from '@/repositories/prisma/prisma-customer-repository'
import { UserAlreadyExistsError } from '@/use-cases/errors/customer-already-exists-error'
import { RegisterCustomerUseCase } from '@/use-cases/register-customer-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  try {
    const customerRepository = new PrismaCustomersRepository()
    const registerUseCase = new RegisterCustomerUseCase(customerRepository)

    await registerUseCase.execute({
      name,
      email,
      password,
    })
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({
        message: error.message,
      })
    }
    throw error
  }

  return reply.status(201).send()
}
