import { env } from '@/env'
import axios from 'axios'

export interface GoogleApiResponse {
  routes: Array<{
    duration: {
      value: string
    }
    distanceMeters: number
    legs: Array<{
      startLocation: {
        latitude: number
        longitude: number
      }
      endLocation: {
        latitude: number
        longitude: number
      }
    }>
  }>
}
/**
 * 
 * {
     "latLng": {
         "latitude": number,
         "longitude": number
     },
     "heading": integer
    }
 * 
 */

export class GoogleApiService {
  private readonly baseUrl =
    'https://routes.googleapis.com/directions/v2:computeRoutes'

  private readonly apiKey = env.GOOGLE_API_KEY

  async getDirections(
    origin: string,
    destination: string,
  ): Promise<GoogleApiResponse> {
    try {
      const response = await axios.post(
        this.baseUrl,
        {
          origin: { address: origin },
          destination: { address: destination },
          travelMode: 'DRIVE', // Modo de transporte
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': this.apiKey, // Chave da API
            'X-Goog-FieldMask':
              'routes.duration,routes.distanceMeters,routes.legs.startLocation,routes.legs.endLocation', // Campos necessários
          },
        },
      )
      console.log(response.data)
      return response.data
    } catch (error) {
      console.error('Error fetching directions from Google API:', error)
      throw new Error('Failed to fetch directions')
    }
  }
}
