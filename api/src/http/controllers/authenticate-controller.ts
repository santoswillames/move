import { PrismaCustomersRepository } from '@/repositories/prisma/prisma-customer-repository'
import { AuthenticateUseCase } from '@/use-cases/authenticate-use-case'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-crendentials-error'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const customersRepository = new PrismaCustomersRepository()
    const authenticateUseCase = new AuthenticateUseCase(customersRepository)

    const { customer } = await authenticateUseCase.execute({
      email,
      password,
    })

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: customer.id,
        },
      },
    )

    return reply.status(200).send({ token })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({
        message: error.message,
      })
    }
    throw error
  }
}
