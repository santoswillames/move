import { PrismaDriverRepository } from '@/repositories/prisma/prisma-driver-repository'
import { PrismaRideRepository } from '@/repositories/prisma/prisma-ride-repository'
import { InvalidDistanceError } from '@/use-cases/errors/invalid-distance-error'
import { InvalidDriverError } from '@/use-cases/errors/invalid-driver-error'
import { RideConfirmUseCase } from '@/use-cases/ride-confirm-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function rideConfirm(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const rideConfirmBodySchema = z
    .object({
      origin: z.string().min(1, 'Origin is required'),
      destination: z.string().min(1, 'Destination is required'),
      distance: z.number().positive('Distance must be a positive number'),
      duration: z.string().min(1, 'Duration is required'),
      driver: z.object({
        id: z.number().int().positive('Driver ID must be a positive integer'),
        name: z.string().min(1, 'Driver name is required'),
      }),
      value: z.number().positive('Value must be a positive number'),
    })
    .refine((data) => data.origin !== data.destination, {
      message: 'Origin and destination cannot be the same',
      path: ['destination'],
    })

  const { origin, destination, distance, duration, driver, value } =
    rideConfirmBodySchema.parse(request.body)

  const customer_id = request.user.sub

  try {
    const rideRepository = new PrismaRideRepository()
    const driverRepository = new PrismaDriverRepository()
    const rideConfirmUseCase = new RideConfirmUseCase(
      rideRepository,
      driverRepository,
    )

    const response = await rideConfirmUseCase.execute({
      customer_id,
      origin,
      destination,
      distance,
      duration,
      driver,
      value,
    })

    reply.status(200).send(response)
  } catch (error) {
    if (error instanceof InvalidDriverError) {
      return reply.status(404).send({
        error_code: 'DRIVER_NOT_FOUND',
        error_description: error.message,
      })
    }

    if (error instanceof InvalidDistanceError) {
      return reply.status(406).send({
        error_code: 'INVALID_DISTANCE',
        error_description: error.message,
      })
    }
    throw error
  }
}
