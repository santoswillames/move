import type { FastifyInstance } from 'fastify'
import { authenticate } from './controllers/authenticate-controller'
import { register } from './controllers/register-customer-controller'
import { verifyJWT } from './middlewares/verify-jwt'
import { ride } from './controllers/ride-controller'

export async function appRoutes(app: FastifyInstance) {
  app.post('/sessions', authenticate)
  app.post('/customers', register)
  app.get('/ride', { onRequest: [verifyJWT] }, ride) // deve conter a query driver_id
  /* app.post("/ride/estimate", () =>
    console.log({
      customer_id: "string",
      origin: "string",
      destination: "string",
    })
  );

  app.patch("ride/confirm", () =>
    console.log({
      customer_id: "string",
      origin: "string",
      destination: "string",
      distance: "number",
      duration: "string",
      driver: {
        id: "number",
        name: "string",
      },
      value: "number",
    })
  );
  */
}
