import { PrismaDriverRepository } from '@/repositories/prisma/prisma-driver-repository'
import { GoogleApiService } from '@/services/google-api-service'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { RideEstimateUseCase } from '@/use-cases/ride-estimate-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function rideEstimate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const rideEstimateBodySchema = z
    .object({
      origin: z.string().min(1, 'Origin is required'),
      destination: z.string().min(1, 'Destination is required'),
    })
    .refine((data) => data.origin !== data.destination, {
      message: 'Origin and destination cannot be the same',
      path: ['destination'],
    })

  const { origin, destination } = rideEstimateBodySchema.parse(request.body)

  try {
    const driverRepository = new PrismaDriverRepository()
    const googleApiService = new GoogleApiService()
    const rideEstimateUseCase = new RideEstimateUseCase(
      googleApiService,
      driverRepository,
    )

    const response = await rideEstimateUseCase.execute({ origin, destination })

    reply.status(200).send(response)
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(400).send({
        error_code: 'INVALID_DATA',
        error_description: error.message,
      })
    }
    throw error
  }
}
