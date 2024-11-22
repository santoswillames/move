import { PrismaDriverRepository } from '@/repositories/prisma/prisma-driver-repository'
import { PrismaRideRepository } from '@/repositories/prisma/prisma-ride-repository'
import { InvalidDriverError } from '@/use-cases/errors/invalid-driver-error'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { RideUseCase } from '@/use-cases/ride-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function ride(request: FastifyRequest, reply: FastifyReply) {
  const rideQuerySchema = z.object({
    driver_id: z.string().optional(),
  })

  const { driver_id } = rideQuerySchema.parse(request.query)
  const customerId = request.user.sub

  try {
    const rideRepository = new PrismaRideRepository()
    const driverRepository = new PrismaDriverRepository()
    const rideUseCase = new RideUseCase(rideRepository, driverRepository)

    const rides = await rideUseCase.execute({
      driverId: Number(driver_id),
      customerId,
    })

    return reply.status(200).send(rides)
  } catch (error) {
    if (error instanceof InvalidDriverError) {
      return reply.status(400).send({
        error_code: 'INVALID_DRIVER',
        error_description: error.message,
      })
    }

    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({
        error_code: 'NO_RIDES_FOUND',
        error_description: error.message,
      })
    }
    throw error
  }
}
