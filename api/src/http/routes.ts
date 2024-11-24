import type { FastifyInstance } from 'fastify'
import { authenticate } from './controllers/authenticate-controller'
import { register } from './controllers/register-customer-controller'
import { verifyJWT } from './middlewares/verify-jwt'
import { ride } from './controllers/ride-controller'
import { rideConfirm } from './controllers/ride-confirm-controller'

export async function appRoutes(app: FastifyInstance) {
  app.post('/sessions', authenticate)
  app.post('/customers', register)
  app.get('/ride', { onRequest: [verifyJWT] }, ride) // deve conter a query driver_id
  app.patch('/ride/confirm', { onRequest: [verifyJWT] }, rideConfirm)
  /* app.post("/ride/estimate", () =>
    console.log({
      customer_id: "string",
      origin: "string",
      destination: "string",
    })
  );

  */
}
