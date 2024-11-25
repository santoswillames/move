import { PrismaDriverRepository } from '@/repositories/prisma/prisma-driver-repository'
import { GoogleApiService } from '@/services/google-api-service'
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

  const driverRepository = new PrismaDriverRepository()
  const googleApiService = new GoogleApiService()
  const rideEstimateUseCase = new RideEstimateUseCase(
    googleApiService,
    driverRepository,
  )

  const response = await rideEstimateUseCase.execute({ origin, destination })

  reply.status(200).send(response)
}
